module Articles exposing (Content(..), ParagraphPart(..), all, sectionTitleToUrl)

import ElmSyntaxHighlight
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
    | ElmCode ElmSyntaxHighlight.SyntaxHighlightable
    | UnorderedList (List Content)
    | Sequence (List Content)


type ParagraphPart
    = Text String
    | Italic String
    | InlineElmCode ElmSyntaxHighlight.SyntaxHighlightable
    | Link { description : String, url : String }


all : Content
all =
    Sequence
        [ introduction
        , yourAstAllowsListsWithDifferentElementTypesWhyArticle
        , whatToDoWithElmReviewErrorsArticle
        , typedValue8Article
        , textOnlyParagraph """⸜(｡˃ ᵕ ˂ )⸝♡"""
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
                { description = "Subscribe via rss"
                , url = "https://lue-bird.github.io/blog/feed.xml"
                }
            , Text " to get the latest articles. Suggest improvements "
            , Link
                { description = "on github"
                , url = "https://github.com/lue-bird/blog"
                }
            , Text "."
            ]
        ]


elmCodeFromRaw : String -> ElmSyntaxHighlight.SyntaxHighlightable
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
    rawStrippedOfBlankStartAndEnd |> ElmSyntaxHighlight.for


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


yourAstAllowsListsWithDifferentElementTypesWhyArticle : Content
yourAstAllowsListsWithDifferentElementTypesWhyArticle =
    Section
        { title = "Your AST allows lists with different element types. Why?"
        , description = """Can you represent a list expression where all elements have the same type? Yes.
And what about operations like (==) on infinitely nested triples?"""
        , publishTime = Time.millisToPosix 1697846400000
        , content =
            Sequence
                [ Paragraph
                    [ Text "There was a time when "
                    , Link { description = "elm-codegen", url = "https://github.com/mdgriffith/elm-codegen" }
                    , Text " and friends like "
                    , Link { description = "review-todo-it-for-me", url = "https://github.com/MartinSStewart/elm-review-todo-it-for-me" }
                    , Text " were not around. Code generation felt under-explored and in need of a framework to generate helpers like record update functions, codecs, html from strings and whatever based on existing elm code."
                    ]
                , Paragraph
                    [ Text "Well, a good chunk of work later there were significant parts in place of an ambitious "
                    , Link { description = "lue-bird/generate-elm", url = "https://github.com/lue-bird/generate-elm" }
                    , Text "."
                    ]
                , Paragraph
                    [ Text "To generate elm code, the decision was made to not directly use "
                    , Link { description = "elm-syntax", url = "https://dark.elm.dmy.fr/packages/stil4m/elm-syntax/latest/" }
                    , Text " for "
                    , Italic "countless"
                    , Text " reasons like not allowing users to generate "
                    , inlineElmCode "3.2 // 'a'"
                    , Text " or avoiding empty nodes."
                    ]
                , textOnlyParagraph "Creating a perfectly type-safe AST + builder was actually working out surprisingly well and was both challenging and fun... until problems like the one in this article's title came up."
                , textOnlyParagraph """And... We will solve this now ◝(ᵔᵕᵔ)◜, illustrated on a simple language with strings, ints, bools, lists and ==.
Starting with a classic but unsafe AST:"""
                , elmCode """
type Expression
  = String String
  | Int Int
  | Bool Bool
  | List (List Expression)
  | Equals { left : Expression, right : Expression }
"""
                , textOnlyParagraph """↑ This is "probably fine" ™ practically but..."""
                , UnorderedList
                    [ Sequence
                        [ textOnlyParagraph """it allows users to generate incorrect expressions"""
                        , elmCode """
List [ String "My name is ", Int 5 ]
"""
                        , textOnlyParagraph "or"
                        , elmCode """
Equals { left = String "High", right = Int 5 }
"""
                        ]
                    , textOnlyParagraph """it has impossible variants you are forced to case on"""
                    ]
                , textOnlyParagraph "How hard can it be to make this small language completely type-safe?"
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
  | EqualsOfList (EqualsOf ??Type??)

type ListExpression
  = ListOfString (List String)
  | ListOfInt (List Int)
  | ListOfBool (List BoolExpression)
  | ListOfList (List ??Type??)

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
  | EqualsOfListOfList (EqualsOf (List ??Type??))
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
                , Paragraph
                    [ Text "Quite cool how this works. For example, to represent a list of strings, we go down "
                    , inlineElmCode "ListOfString String"
                    , Text " with the String type directly passed from above. And if the string list is the element type of another list, we go through "
                    , inlineElmCode "ListOfList (ListOfString (List String))"
                    , Text " where the \"wrapping into a list type\" is passed down recursively."
                    ]
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
                , textOnlyParagraph """All these recursive types follow the same shape shown below. Can we abstract this somehow in elm?"""
                , elmCode """
-- with Outer being (Type -> Type)
type ByExpressionType string int bool
  = String (Outer string)
  | Int (Outer int)
  | Bool (Outer bool)
  | List (ByExpressionType (List string) (List int) (List bool))

type alias Expression =
    -- with Outer a = a
    ByExpressionType String Int BoolKnown

type alias ListExpression =
    -- with Outer a = List a
    ByExpressionType String Int BoolKnown

type alias EqualsExpression =
    -- with Outer a = EqualsOf a
    ByExpressionType String Int BoolKnown
"""
                , Paragraph
                    [ Text "The "
                    , InlineElmCode [ { string = "Outer", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                    , Text " is what makes this tricky since "
                    , InlineElmCode [ { string = "Outer", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                    , Text " can only be at that level: We want to represent \"list of a == list of a\", not \"list of (a == a)\"."
                    ]
                , textOnlyParagraph """Having one type for all expression kinds are in one place is still a nice idea, tho:"""
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
type ListExpression string int bool
  = ListExpression
      (ByExpressionType
          (List string)
          (List int)
          (List bool)
          (ListExpression (List string) (List int) (List bool))
      )

type EqualsExpression string int bool
  = EqualsExpression
      (ByExpressionType
          (EqualsOf string)
          (EqualsOf int)
          (EqualsOf bool)
          (EqualsExpression (List string) (List int) (List bool))
      )
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
          (ListExpression String Int BoolKnown)
      )
  
type alias TripleOf first second third =
    { first : first, second : second, third : third }

type ListExpression string int bool
  = ListExpression
      (ByExpressionType
          (List string)
          (List int)
          (List bool)
          (List ??Type??)
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
          (EqualsOf ??Type??)
          (EqualsExpression string int bool)
      )

type BoolKnown
  = BoolLiteral Bool
  | Equals (EqualsExpression String Int BoolKnown)
"""
                , textOnlyParagraph """The pieces don't seem to fit."""
                , textOnlyParagraph """Do we need to start even simpler? Maybe with a simpler AST of only int, tuple and equals and a naive approach... Well, what would be a naive approach?"""
                , textOnlyParagraph """Tuples and especially triples made past lue lose hope of being able to safely represent them like this in an ast.
So much so in fact that past lue was slowly losing interest and abandoned this project after a while. (╥﹏╥)"""
                , Paragraph
                    [ Text "Much, much later... in fact only when writing this did "
                    , Italic "two"
                    , Text """-ish solutions reveal themselves that would have saved a good chunk of past lue's sanity.
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
        { title = "(Almost complete) Wrapping wrappers safely: typed-value 8.0.0"
        , description = """Preserving the knowledge of what was wrapped when wrapping again.
typed-value 8.0.0 makes this safe."""
        , publishTime = Time.millisToPosix 1698451200000
        , content =
            Sequence
                [ Paragraph
                    [ Text "Let's build a generic set type with a custom, user-provided order function similar to "
                    , Link { description = "KeysSet", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-keysset/latest/" }
                    , Text " to show the power of being able to wrap a generic typed, enabled by "
                    , Link { description = "Typed", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/" }
                    , Text " 8 (we'll get to what this means exactly, don't worry)"
                    ]
                , elmCode """
module GenericSet exposing (GenericSet, insert, remove)

type alias GenericSet element uniqueOrder =
    Typed Checked uniqueOrder Internal ..Type..

insert :
    Ordering element unique
    -> element
    -> (GenericSet element unique -> GenericSet element unique)
insert elementOrdering elementToInsert = ..expression..

remove :
    Ordering element unique
    -> element
    -> (GenericSet element unique -> GenericSet element unique)
remove elementOrdering elementToRemove = ..expression..
"""
                , UnorderedList
                    [ Paragraph
                        [ Text "Each unique "
                        , InlineElmCode [ { string = "Ordering", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                        , Text " has a unique last type argument."
                        ]
                    , Paragraph
                        [ InlineElmCode [ { string = "GenericSet", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                        , Text " enforces that all operations need an "
                        , InlineElmCode [ { string = "Ordering", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                        , Text " with the same "
                        , inlineElmCode "unique"
                        , Text " type argument."
                        ]
                    ]
                , Paragraph [ Text "Therefore, the inner order function is enforced to be the same across every operation." ]
                , Paragraph
                    [ Text "If we would represent an "
                    , InlineElmCode [ { string = "Ordering", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                    , Text """ as a normal opaque type, getting the actual function to order the elements would be unsafe"""
                    ]
                , elmCode """
type alias Ordering subject opaque =
    { opaque : opaque, toFunction : opaque -> ( subject, subject ) -> Order }

fakeOrdering =
    { opaque = realOrdering.opaque, toFunction = \\_ -> fakeFunction }
"""
                , Paragraph
                    [ Text "Unlike opaque types, "
                    , Link { description = "Typed", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/" }
                    , Text " gives you control over who can access the inner order function:"
                    ]
                , elmCode """
type alias Ordering subject tag =
    Typed
        Checked -- only constructible using tag
        tag
        Public -- everyone can access
        (( subject, subject ) -> Order)
"""
                , elmCode """
module Int.Order exposing (increasing, Increasing)

increasing : Ordering Int Increasing
increasing =
    Typed.tag Increasing compare

type Increasing
  = Increasing
"""
                , elmCode """
module Int.FakeOrder exposing (increasing, Increasing)

increasing : Ordering Int Increasing
increasing =
    Typed.tag Increasing (\\_ -> EQ)

type Increasing
  = Increasing
"""
                , elmCode """
GenericSet.empty
    |> GenericSet.insert Int.Order.increasing 3
    |> GenericSet.remove Int.FakeOrder.increasing 3 -- compile-time error
"""
                , Paragraph
                    [ Text "All that was already possible before 8.0.0."
                    , Text " What's new is how we can preserve tags while wrapping a "
                    , Link { description = "Typed", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/" }
                    , Text "."
                    ]
                , Paragraph [ Text "A simple example: implementing ", inlineElmCode "Order.reverse" ]
                , elmCode """
reverse : Ordering subject tag -> Ordering subject (Reverse tag)
reverse =
    Typed.mapTo (Reverse {- ?? -}) (\\order -> \\( a, b ) -> order ( b, a ))

type Reverse tag
    = Reverse tag
"""
                , Paragraph
                    [ Text """You'd need to store a tag in the inner value, which breaks the promise
that only the module with the tag can create """
                    , inlineElmCode "Ordering"
                    , Text "s with that tag. Now with 8.0.0:"
                    ]
                , elmCode """
type Reverse
    = Reverse

reverse : Ordering subject tag -> Ordering subject ( Reverse, tag )
reverse =
    Typed.mapToWrap Reverse (\\order -> \\( a, b ) -> order ( b, a ))
"""
                , textOnlyParagraph """Notice how we don't have access to the tag of the argument
but can still safely show it in the signature."""
                , Paragraph
                    [ Text "How did "
                    , Link { description = "KeysSet", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-keysset/latest/" }
                    , Text " do this prior to version 8? Unsafe phantom types 🤮:"
                    ]
                , elmCode """
type Reverse tag
    = Reverse

reverse : Ordering subject tag -> Ordering subject (Reverse tag)
reverse =
    Typed.mapTo Reverse (\\order -> \\a b -> order b a)

reverseOops : Ordering subject orderTag -> Ordering subject (Reverse tag)
reverseOops =
    Typed.mapTo Reverse (\\order -> \\a b -> order b a)
"""
                , textOnlyParagraph """The reversed tag can accidentally be anything. It's a free variable :("""
                , textOnlyParagraph """Frankly, using tuples for multiple tag arguments in type signatures can get a bit unreadable. A quick solution:"""
                , elmCode """
type alias Reverse orderTag =
    ( ReverseTag, orderTag )

type ReverseTag
    = Reverse

reverse : Ordering subject tag -> Ordering subject (Reverse tag)
reverse =
    Typed.mapToWrap Reverse (\\order -> \\a b -> order b a)
"""
                , textOnlyParagraph """Still as safe and readers will be happy, too!"""
                , Paragraph
                    [ Text "I'll leave you with one last example, showing how "
                    , Link { description = "KeysSet", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-keysset/latest/" }
                    , Text ", which is more like a dict than a set, safely stores its sorting:"
                    ]
                , elmCode """
type SortingTag
    = Sorting

type alias Sorting element tag key =
    Typed
        Checked
        ( SortingTag, tag )
        Public
        { toKey : element -> key
        , keyOrder : element -> element -> Order
        }

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
                ]
        }


sectionTitleToUrl : String -> String
sectionTitleToUrl =
    \title ->
        title |> Url.percentEncode
