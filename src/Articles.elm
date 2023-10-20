module Articles exposing (Content(..), ParagraphPart(..), all, sectionTitleToUrl)

import ElmCodeUi
import List.Extra
import RangeDict exposing (RangeDict)
import String.Extra
import Time
import Url


type Content
    = Section
        { title : String
        , description : String
        , publishTime : Time.Posix
        , content : Content
        }
    | Paragraph (List ParagraphPart)
    | ElmCode { raw : String, syntaxKindMap : RangeDict ElmCodeUi.SyntaxKind }
    | UnorderedList (List Content)
    | Sequence (List Content)


type ParagraphPart
    = Text String
    | Italic String
    | InlineElmCode { raw : String, syntaxKindMap : RangeDict ElmCodeUi.SyntaxKind }
    | Link { description : String, url : String }


all : Content
all =
    Sequence
        [ introduction
        , aSaferAstArticle
        , whatToDoWithElmReviewErrorsArticle
        , typedValue8Article
        ]


textOnlyParagraph : String -> Content
textOnlyParagraph text =
    Paragraph [ Text text ]


introduction : Content
introduction =
    Sequence
        [ textOnlyParagraph "Yahallo! 🐦"
        , Paragraph
            [ Link
                { description = "Subscribing via rss"
                , url = "https://lue-bird.github.io/blog/feed.xml"
                }
            , Text " gets you the latest articles. Feel free to check the "
            , Link
                { description = "source on github"
                , url = "https://github.com/lue-bird/blog"
                }
            , Text " to suggest improvements."
            ]
        ]


elmCodeFromRaw : String -> { raw : String, syntaxKindMap : RangeDict ElmCodeUi.SyntaxKind }
elmCodeFromRaw raw =
    let
        rawStrippedOfBlankStartAndEnd : String
        rawStrippedOfBlankStartAndEnd =
            raw
                |> String.lines
                |> List.Extra.dropWhile String.Extra.isBlank
                |> List.Extra.dropWhileRight String.Extra.isBlank
                |> String.join "\n"
    in
    { raw = rawStrippedOfBlankStartAndEnd
    , syntaxKindMap = rawStrippedOfBlankStartAndEnd |> ElmCodeUi.syntaxKindMap
    }


inlineElmCode : String -> ParagraphPart
inlineElmCode raw =
    InlineElmCode (elmCodeFromRaw raw)


elmCode : String -> Content
elmCode raw =
    ElmCode (elmCodeFromRaw raw)


whatToDoWithElmReviewErrorsArticle : Content
whatToDoWithElmReviewErrorsArticle =
    Section
        { title = "(Barely anything) What to do with elm-review errors?"
        , description = """Something to try: Not fixing all elm-review errors immediately."""
        , publishTime = Time.millisToPosix 1697932800000
        , content =
            Sequence
                [ textOnlyParagraph """Ever wanted to add helpers but introducing them at once would start a chain reaction?"""
                , textOnlyParagraph """Especially when the new helper will make existing helpers irrelevant, it seems simplest to just get the refactor done with."""
                , textOnlyParagraph """If you feel like this (like past and sometimes current lue), here's an alternative to try:"""
                , textOnlyParagraph """Do a small, local, immediate step. Commit.
If you're happy, slowly follow `elm-review` and compiler errors and your project's refactoring todo list items one at a time."""
                , elmCode """
listUnzipCheck =
    case lastArgument partitionCall of
        Just listArgument ->
            let error = TODO
            in
            case listArgument of
                Expression.Tuple2Literal tuple2 ->
                    Just error
                
                nonTuple2Literal ->
                    nonTuple2Literal
                        |> Elm.Syntax.Expression.Extra.parseSpecificFnCall "Tuple.pair"
                        |> Maybe.map (\\_ -> error)
        
        Just TODO -> TODO

listPartitionCheck partitionCall =
    case fullyAppliedLastArg partitionCall.arguments of
        TODO -> TODO
"""
                , elmCode """
module Elm.Syntax.Expression.Extra exposing (getTuple2)
getTuple2 = ...
"""
                , textOnlyParagraph """Oh no! The editor gives me squigglies, the CI is red, what to do?"""
                , textOnlyParagraph """Most of these do not need to be fixed immediately!"""
                , Paragraph
                    [ Text "They are like leaving "
                    , inlineElmCode "Debug.todo"
                    , Text """ or failing test somewhere.
You know, the stuff that allows you to keep less things in your mind that "you still need to do"."""
                    ]
                , textOnlyParagraph """In that way, they are like an automated todo list for you and your whole team."""
                , textOnlyParagraph """If you think there won't be an automated error for something on the way, make it a new item in a todo list.
Aggregating errors isn't scary. They have your back."""
                ]
        }


aSaferAstArticle : Content
aSaferAstArticle =
    Section
        { title = "(Almost complete) A safer AST?"
        , description = """Can you represent a list expression where all elements have the same type? Yes.
And what about operations like (==) on infinitely nested triples?"""
        , publishTime = Time.millisToPosix 1697846400000
        , content =
            Sequence
                [ textOnlyParagraph """Let's consider a really simple language"""
                , elmCode """
type Expression
  = String String
  | Int Int
  | Bool Bool
  | List (List Expression)
  | Equals { left : Expression, right : Expression }
"""
                , textOnlyParagraph """This is "probably fine" TM but..."""
                , UnorderedList
                    [ Sequence
                        [ textOnlyParagraph """it allows users to generate incorrect expressions"""
                        , elmCode """
List [ String "My name is ", Int 5 ]
"""
                        , textOnlyParagraph "or"
                        , elmCode """
Equals { left = String "High" , right = Int 5 }
"""
                        ]
                    , textOnlyParagraph """it has impossible variants you are forced to case on"""
                    ]
                , textOnlyParagraph """How hard can it be to make this small language completely type-safe?
Spoiler: It is possible."""
                , textOnlyParagraph """Naively, we could represent each kind of list and equals by it's own variant"""
                , elmCode """
type Expression
  = String String
  | Int Int
  | Bool Bool
  | List ListExpression
  | Equals EqualsExpression


type alias EqualsOf specificExpression =
    { left : specificExpression, right : specificExpression }

type EqualsExpression
  = EqualsOfString (EqualsOf String)
  | EqualsOfInt (EqualsOf Int)
  | EqualsOfBool (EqualsOf BoolExpression)
  | EqualsOfList (EqualsOf {- ?? -})

type ListExpression
  = ListOfString (List String)
  | ListOfInt (List Int)
  | ListOfBool (List BoolExpression)
  | ListOfList (List {- ?? -})

type BoolExpression
  = BoolLiteral Bool
  | EqualsExpression EqualsExpression
"""
                , Paragraph [ Text "The ", Italic "??", Text " just keep on expanding, let's take for example the case ", inlineElmCode "EqualsOfList" ]
                , elmCode """
type EqualsExpression
  = {- ... | -} EqualsOfList EqualsExpressionOfList

type EqualsExpressionOfList
  = EqualsOfListOfString (EqualsOf (List String))
  | EqualsOfListOfInt (EqualsOf (List Int))
  | EqualsOfListOfBool (EqualsOf (List BoolExpression))
  | EqualsOfListOfList (EqualsOf (List {- ?? -}))
"""
                , textOnlyParagraph """We just run into the same problem recursively."""
                , textOnlyParagraph """We can apply some smart-smart to solve this!"""
                , elmCode """
type alias EqualsOf specificExpression =
    { left : specificExpression, right : specificExpression }

type EqualsExpression string int bool
  = EqualsOfString (EqualsOf string)
  | EqualsOfInt (EqualsOf int)
  | EqualsOfBool (EqualsOf bool)
  | EqualsOfList (EqualsExpression (List string) (List int) (List bool))


type ListExpression string int bool
  = ListOfString (List string)
  | ListOfInt (List int)
  | ListOfBool (List bool)
  | ListOfList (ListExpression (List string) (List int) (List bool))

type BoolKnown
  = BoolLiteral Bool
  | Equals (EqualsExpression String Int BoolKnown)

type Expression
  = String String
  | Int Int
  | Bool Bool
  | List (ListExpression String Int BoolKnown)
  | Equals (EqualsExpression String Int BoolKnown)
"""
                , textOnlyParagraph """which allows us to build lists like"""
                , elmCode """
List
    (ListOfList
        (ListOfBool
            [ [ BoolLiteral True ]
            , [ Equals
                    (EqualsOfList
                        (EqualsOfString
                            { left = [ "Hello", "world" ]
                            , right = [ "Hello", "expression" ]
                            }
                        )
                    )
              , BoolLiteral False
              ]
            ]
        )
    )
"""
                , textOnlyParagraph """Somehow, this works."""
                , textOnlyParagraph """All these recursive types follow the same shape shown below. Can we abstract this somehow in elm?"""
                , elmCode """
-- with Outer being (Type -> Type)
type ByExpressionType outer string int bool
  = String (Outer string)
  | Int (Outer int)
  | Bool (Outer bool)
  | List (ByExpressionType (List string) (List int) (List bool))

type alias Expression =
    ByExpressionType Identity String Int BoolKnown
type alias ListExpression =
    ByExpressionType List String Int BoolKnown
type alias EqualsExpression =
    ByExpressionType EqualsOf String Int BoolKnown
"""
                , Paragraph [ Text "The ", inlineElmCode "outer", Text " is what makes this tricky." ]
                , textOnlyParagraph """Having an AST without it we can't for example represent "list equals list", only "a list of equals":"""
                , elmCode """
type ByExpressionType string int bool
  = String string
  | Int int
  | Bool bool
  | List (ByExpressionType (List string) (List int) (List bool))

type alias Expression =
    ByExpressionType String Int BoolKnown
type alias ListExpression =
    ByExpressionType (List String) (List Int) (List BoolKnown)
type alias EqualsExpression =
    ByExpressionType (EqualsOf String) (EqualsOf Int) (EqualsOf BoolKnown)
"""
                , textOnlyParagraph """So this is not quite right."""
                , textOnlyParagraph """We can at least keep the idea to list all expression kinds are in one place:"""
                , elmCode """
type ByExpressionType string int bool list
  = String string
  | Int int
  | Bool bool
  | List list

type alias Expression =
    ByExpressionType String Int BoolKnown (ListExpression String Int BoolKnown)

type ListExpression string int bool =
    ByExpressionType
        (List string)
        (List int)
        (List bool)
        (ListExpression (List string) (List int) (List bool))

type alias EqualsOf specificExpression =
    { left : specificExpression, right : specificExpression }

type alias EqualsExpression string int bool =
    ByExpressionType
        (EqualsOf string)
        (EqualsOf int)
        (EqualsOf bool)
        (EqualsExpression string int bool)

type BoolKnown
  = BoolLiteral Bool
  | Equals (EqualsExpression String Int BoolKnown)
"""
                , textOnlyParagraph """which actually looks pretty nice?"""
                , elmCode """
List
    (List
        (Bool
            [ [ BoolLiteral True ]
            , [ Equals
                    (List
                        (String
                            { left = [ "Hello", "world" ]
                            , right = [ "Hello", "expression" ]
                            }
                        )
                    )
              , BoolLiteral False
              ]
            ]
        )
    )
"""
                , Paragraph [ Text "Well, it doesn't compile because \"recursive type aliases\" but the fix is as simple as converting each alias to a ", inlineElmCode "type" ]
                , elmCode """
type ByExpressionType string int bool list
  = String string
  | Int int
  | Bool bool
  | List list

type alias Expression =
    ByExpressionType String Int BoolKnown (ListExpression String Int BoolKnown)

type ListExpression string int bool
  = ListExpression
      (ByExpressionType
          (List string)
          (List int)
          (List bool)
          (ListExpression (List string) (List int) (List bool))
      )

type alias EqualsOf specificExpression =
    { left : specificExpression, right : specificExpression }

type EqualsExpression string int bool
  = EqualsExpression
      (ByExpressionType
          (EqualsOf string)
          (EqualsOf int)
          (EqualsOf bool)
          (EqualsExpression (List string) (List int) (List bool))
      )

type BoolKnown
  = BoolLiteral Bool
  | Equals (EqualsExpression String Int BoolKnown)
"""
                , textOnlyParagraph """the result looks less nice but acceptable I guess"""
                , elmCode """
List
    (ListExpression
        (List
            (ListExpression
                (Bool
                    [ [ BoolLiteral True ]
                    , [ Equals
                            (EqualsExpression
                                (List
                                    (EqualsExpression
                                        (String
                                            { left = [ "Hello", "world" ]
                                            , right = [ "Hello", "expression" ]
                                            }
                                        )
                                    )
                                )
                            )
                      , BoolLiteral False
                      ]
                    ]
                )
            )
        )
    )
"""
                , textOnlyParagraph """Let's add triples to that language"""
                , elmCode """
type ByExpressionType string int bool triple list
  = String string
  | Int int
  | Bool bool
  | Triple triple
  | List list

type Expression
  = Expression
      (ByExpressionType
          String
          Int
          BoolKnown
          (TripleOf Expression Expression Expression)
          (ListExpression String Int BoolKnown (TripleOf Expression Expression Expression))
      )
  
type alias TripleOf first second third =
    { first : first, second : second, third : third }

type ListExpression string int bool triple
  = ListExpression
      (ByExpressionType
          (List string)
          (List int)
          (List bool)
          (List triple)
          (ListExpression (List string) (List int) (List bool) (List triple))
      )

type alias EqualsOf specificExpression =
    { left : specificExpression, right : specificExpression }

type EqualsExpression string int bool
  = EqualsExpression
      (ByExpressionType
          (EqualsOf string)
          (EqualsOf int)
          (EqualsOf bool)
          (EqualsOf {- ?? -})
          (EqualsExpression string int bool (TripleOf {- ?? -}))
      )

type BoolKnown
  = BoolLiteral Bool
  | Equals (EqualsExpression String Int BoolKnown)
"""
                , textOnlyParagraph """The pieces don't seem to fit."""
                , textOnlyParagraph """I guess we have to start even simpler? Maybe with a simpler AST of only int, tuple and equals and a naive approach... Well, what would be a naive approach?"""
                , textOnlyParagraph """Tuples and especially triples made past lue lose hope of being able to safely represent them like this in an ast.
So much so in fact that lue was slowly losing interest and abandoned this project after a while."""
                , Paragraph
                    [ Text "Much, much later... in fact only when writing this did I think of "
                    , Italic "two"
                    , Text """-ish solutions that would have saved a good chunk of my sanity.
I know you're smarter than me, so if you have a free afternoon or whatever, maybe use this as a brain exercise?
Or just look at the solutions below."""
                    ]
                , textOnlyParagraph """First the -ish solution:"""
                , elmCode """
type Expression
    = Int Int
    | Tuple (TupleOf Expression Expression)
    | Equals EqualsExpression

type alias TupleOf first second =
    { first : first, second : second }

type alias EqualsOf specificExpression =
    { left : specificExpression, right : specificExpression }

type EqualsExpressionByType int equals
    = EqualsOfInt (EqualsOf int)
    | EqualsOfEqualsExpression (EqualsOf equals)
    | EqualsOfTupleExtendedByFirstInt (EqualsExpressionByType (TupleOf Int int) (TupleOf Int equals))
    | EqualsOfTupleExtendedByFirstEqualsExpression (EqualsExpressionByType (TupleOf EqualsExpression int) (TupleOf EqualsExpression equals))
    | EqualsOfTupleExtendedBySecondInt (EqualsExpressionByType (TupleOf int Int) (TupleOf equals Int))
    | EqualsOfTupleExtendedBySecondEqualsExpression (EqualsExpressionByType (TupleOf int EqualsExpression) (TupleOf equals EqualsExpression))

type EqualsExpression
    = EqualsExpression (EqualsExpressionByType Int EqualsExpression)
"""
                , Paragraph [ Text "Expressions written down look passable. Here for ", inlineElmCode "( 0, 0 == 0 ) == ( 0, 0 == 0 )" ]
                , elmCode """
Equals
    (EqualsExpression
        (EqualsOfTupleExtendedByFirstInt
            (EqualsOfEqualsExpression
                { left =
                    { first = 0
                    , second = EqualsExpression (EqualsOfInt { left = 0, right = 0 })
                    }
                , right =
                    { first = 0
                    , second = EqualsExpression (EqualsOfInt { left = 0, right = 0 })
                    }
                }
            )
        )
    )
"""
                , textOnlyParagraph """The one unsatisfying parts"""
                , UnorderedList
                    [ Sequence
                        [ Paragraph
                            [ inlineElmCode "ExtendFirstX (OfY xy)"
                            , Text " and "
                            , inlineElmCode "ExtendedSecondY (OfX xy)"
                            , Text " are equivalent if the "
                            , inlineElmCode "xy"
                            , Text " isn't nested further (and so only flat tuples are compared)"
                            ]
                        , UnorderedList
                            [ textOnlyParagraph """This, I'm sure can be ironed out on the type level [Citation needed]"""
                            ]
                        ]
                    , Sequence
                        [ textOnlyParagraph """I cannot, even now, think of a safe equivalent for triples"""
                        , UnorderedList
                            [ textOnlyParagraph """If it exists, it probably also grows rapidly in variant count"""
                            , textOnlyParagraph """If you think you found something, even if cursed, I beg you to drop me a line @lue on slack"""
                            ]
                        ]
                    ]
                , textOnlyParagraph """Strangely, with the second solution everything becomes eerily simple:"""
                , elmCode """
type EqualsExpression
  = EqualsOfInt (EqualsOf Int)
  | EqualsOfExpression (EqualsOf EqualsExpression)
  | EqualsOfTuple { firsts : EqualsExpression, seconds : EqualsExpression }
  | EqualsOfTriple { firsts : EqualsExpression, seconds : EqualsExpression, thirds : EqualsExpression }
"""
                , textOnlyParagraph """Wtf?"""
                ]
        }


typedValue8Article : Content
typedValue8Article =
    Section
        { title = "(Almost complete) typed-value 8.0.0"
        , description = "TODO"
        , publishTime = Time.millisToPosix 1698451200000
        , content =
            Sequence
                [ Paragraph
                    [ Link { description = "Typed", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/" }
                    , Text """ 8's power:
wrapping a generic typed.

As an example how """
                    , Link { description = "KeySet", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-keyset/latest/KeySet" }
                    , Text " uses "
                    , Link { description = "Typed", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/" }
                    ]
                , elmCode """
type alias Ordering a tag =
    Typed Checked tag Public (a -> a -> Order)

reverse : Ordering subject tag -> Ordering subject ( Reverse, tag )
reverse = x {- ... -}
"""
                , Paragraph
                    [ inlineElmCode "Ordering"
                    , Text """ operations couldn't be represented using normal opaque types
because you can't generically look inside."""
                    ]
                , Paragraph
                    [ Text """You'd need to store a tag, but having access to the tag ruins the promise
that only the module with the tag can create """
                    , inlineElmCode "Ordering"
                    , Text "s with that tag."
                    ]
                , elmCode """
module Int.Order exposing (increasing, Increasing)

increasing : Ordering Int Increasing
increasing = Typed.tag Increasing compare
type Increasing = Increasing
"""
                , elmCode """
module Float.Order exposing (increasing, Increasing)

increasing : Ordering Float Increasing
increasing = Typed.tag Increasing compare
type Increasing = Increasing
"""
                , elmCode """
module KeySet exposing (KeySet, insert, remove)

type alias Sorting element tag key =
    Typed
        Checked
        ( SortingTag, tag )
        Public
        { toKey : element -> key
        , keyOrder : element -> element -> Order
        }

type SortingTag
    = Sorting

sortingKey :
    Typed Checked keyTag Public (element -> key)
    -> Ordering key keyOrderTag
    -> Sorting element ( keyTag, keyOrderTag ) key
sortingKey = x {- ... -}

type alias KeySet element tag =
    Typed Checked tag Internal {- internals -}

insert :
    Sorting element tag key_
    -> element
    -> KeySet element tag
    -> KeySet element tag
insert = x {- ... -}

remove :
    Sorting element tag key
    -> key
    -> KeySet element tag
    -> KeySet element tag
remove = x {- ... -}
"""
                , elmCode """
KeySet.empty
    |> KeySet.insert Float.Order.increasing 3
    |> KeySet.remove Int.Order.increasing 4.0 -- compile-time error
"""
                , UnorderedList
                    [ Paragraph [ Text "Each unique ", inlineElmCode "Sorting", Text " has a unique ", inlineElmCode "tag", Text " combination ", inlineElmCode "( toKeyTag, keyOrderTag )" ]
                    , Paragraph [ inlineElmCode "KeySet", Text " enforces that all operations need a ", inlineElmCode "Sorting", Text " with the same ", inlineElmCode "tag" ]
                    ]
                , Paragraph [ Text "Therefore, the supplied ", inlineElmCode "toKey", Text " and ", inlineElmCode "keyOrdering", Text " functions are enforced to be the same across every operation." ]
                , Paragraph [ Text "What's new in version 8 is how we can preserve tags through wrapping them" ]
                , elmCode """
type SortingTag
    = Sorting

sortingKey :
    Typed Checked keyTag Public (element -> key)
    -> Ordering key keyOrderTag
    -> Sorting element ( keyTag, keyOrderTag ) key
sortingKey toKeyTyped keyOrdering =
    toKeyTyped
        |> Typed.wrapAnd keyOrdering
        --: Typed ( keyTag, keyOrderTag ) Tagged Public {- ... -}
        |> Typed.mapToWrap Sorting
            (\\( toKey, keyOrder ) ->
                { toKey = toKey
                , keyOrder = keyOrder
                }
            )
"""
                , Paragraph [ Text "in a simpler example: implementing ", inlineElmCode "Order.reverse" ]
                , elmCode """
type Reverse
    = Reverse

reverse : Ordering subject tag -> Ordering subject ( Reverse, tag )
reverse =
    Typed.mapToWrap Reverse (\\order -> \\a b -> order b a)
"""
                , textOnlyParagraph """Notice how we don't have access to the tag of the argument
but can still safely show it in the signature.

How did we do this in version 7? Unsafe phantom types 🤮:"""
                , elmCode """
type Reverse tag
    = Reverse

reverse : Ordering subject tag -> Ordering subject (Reverse tag)
reverse =
    Typed.mapTo Reverse (\\order -> \\a b -> order b a)

reverseOops : Ordering subject orderTag -> Ordering subject (Reverse tag)
reverseOops = x {- ... -}
"""
                , textOnlyParagraph """The reversed tag can accidentally be anything. It's a free variable :(

Sadly that's sometimes more readable for multiple tag arguments. A quick solution:"""
                , elmCode """
type alias Reverse orderTag =
    ( ReverseTag, orderTag )

type ReverseTag
    = Reverse

reverse : Ordering subject tag -> Ordering subject (Reverse tag)
reverse =
    Typed.mapToWrap Reverse (\\order -> \\a b -> order b a)
"""
                , textOnlyParagraph """Makes it safe, makes brain happy!"""
                ]
        }


sectionTitleToUrl : String -> String
sectionTitleToUrl =
    \title ->
        title |> Url.percentEncode
