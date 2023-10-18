module Articles exposing (Content(..), all, sectionTitleToUrl, toHtmlStringifiable)

import Html.String
import List.Extra
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
    | Paragraph String
    | ElmCode String
    | UnorderedList (List Content)
    | Sequence (List Content)


all : Content
all =
    Sequence
        [ aSaferAstArticle
        , whatToDoWithElmReviewErrorsArticle
        ]


whatToDoWithElmReviewErrorsArticle : Content
whatToDoWithElmReviewErrorsArticle =
    Section
        { title = "(Barely anything) What to do with elm-review errors?"
        , description = """Something to try: Not fixing all elm-review errors immediately."""
        , publishTime = Time.millisToPosix 1697932800000
        , content =
            Sequence
                [ Paragraph """Ever wanted to add helpers but introducing them at once would start a chain reaction?"""
                , Paragraph """Especially when the new helper will make existing helpers irrelevant, it seems simplest to just get the refactor done with."""
                , Paragraph """If you feel like this (like past and sometimes current lue), here's an alternative to try:"""
                , Paragraph """Do a small, local, immediate step. Commit.
If you're happy, slowly follow `elm-review` and compiler errors and your project's refactoring todo list items one at a time."""
                , ElmCode """
listUnzipCheck =
    case lastArgument partitionCall of
        Just listArgument ->
            let error = ...
            in
            case listArgument of
                Expression.Tuple2Literal tuple2 ->
                    Just error
                
                nonTuple2Literal ->
                    nonTuple2Literal
                        |> Elm.Syntax.Expression.Extra.parseSpecificFnCall "Tuple.pair"
                        |> Maybe.map (\\_ -> error)
        
        Just ()

listPartitionCheck partitionCall =
    case fullyAppliedLastArg partitionCall.arguments of
        TODO
"""
                , ElmCode """
module Elm.Syntax.Expression.Extra exposing (getTuple2)
getTuple2 = ...
"""
                , Paragraph """Oh no! The editor gives me squigglies, the CI is red, what to do?"""
                , Paragraph """Most of these do not need to be fixed immediately!"""
                , Paragraph """They are like leaving `Debug.todo` or failing test somewhere.
You know, the stuff that allows you to keep less things in your mind that "you still need to do"."""
                , Paragraph """In that way, they are like an automated todo list for you and your whole team."""
                , Paragraph """If you think there won't be an automated error for something on the way, make it a new item in a todo list.
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
                [ Paragraph """Let's consider a really simple language"""
                , ElmCode """
type Expression
  = String String
  | Int Int
  | Bool Bool
  | List (List Expression)
  | Equals { left : Expression, right : Expression }
"""
                , Paragraph """This is "probably fine" TM but..."""
                , UnorderedList
                    [ Sequence
                        [ Paragraph """it allows users to generate incorrect expressions"""
                        , ElmCode """
List [ String "My name is ", Int 5 ]
Equals { left = String "High" , right = Int 5 }
"""
                        ]
                    , Paragraph """it has impossible variants you are forced to case on"""
                    ]
                , Paragraph """How hard can it be to make this small language completely type-safe?"""
                , Paragraph """Naively, we could represent each kind of list and equals by it's own variant"""
                , ElmCode """
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
  | EqualsOfList (EqualsOf ??)

type ListExpression
  = ListOfString (List String)
  | ListOfInt (List Int)
  | ListOfBool (List BoolExpression)
  | ListOfList (List ??)

type BoolExpression
  = BoolLiteral Bool
  | EqualsExpression EqualsExpression
"""
                , Paragraph """The ?? just keep on expanding, let's say with"""
                , ElmCode """
type EqualsExpression
  = ... | EqualsOfList EqualsExpressionOfList

type EqualsExpressionOfList
  = EqualsOfListOfString (EqualsOf (List String))
  | EqualsOfListOfInt (EqualsOf (List Int))
  | EqualsOfListOfBool (EqualsOf (List BoolExpression))
  | EqualsOfListOfList (EqualsOf (List ??))
"""
                , Paragraph """We just run into the same problem recursively."""
                , Paragraph """We can apply some smart-smart to solve this!"""
                , ElmCode """
type Expression
  = String String
  | Int Int
  | Bool Bool
  | List (ListExpression String Int BoolKnown)
  | Equals (EqualsExpression String Int BoolKnown)


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
"""
                , Paragraph """which allows us to build lists like"""
                , ElmCode """
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
                , Paragraph """Somehow, this works."""
                , Paragraph """All these recursive types follow the same shape shown below. Can we abstract this somehow in elm?"""
                , ElmCode """
ByExpressionType : (Type -> Type) -> Type -> Type -> Type -> Type
ByExpressionType outer string int bool
  = String (outer string)
  | Int (outer int)
  | Bool (outer bool)
  | List (ByExpressionType (List string) (List int) (List bool))

type alias Expression =
    ByExpressionType Identity String Int BoolKnown
type alias ListExpression =
    ByExpressionType List String Int BoolKnown
type alias EqualsExpression =
    ByExpressionType EqualsOf String Int BoolKnown
"""
                , Paragraph """The `outer` is what makes this tricky."""
                , Paragraph """Having an AST without it we can't for example represent "list equals list", only "a list of equals":"""
                , ElmCode """
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
                , Paragraph """So this is not quite right."""
                , Paragraph """We can at least keep the general idea so that all expression kinds are in one place:"""
                , ElmCode """
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

type alias EqualsOf =
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
                , Paragraph """which actually looks pretty nice?"""
                , ElmCode """
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
                , Paragraph """Well, it doesn't compile because "recursive type aliases" but the fix is as simple as wrapping each alias as a `type`"""
                , ElmCode """
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
                , Paragraph """the result looks less nice but acceptable I guess"""
                , ElmCode """
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
                , Paragraph """Let's add triples to that language"""
                , ElmCode """
type ByExpressionType string int bool triple list
  = String string
  | Int int
  | Bool bool
  | Triple triple
  | List list

type Expression =
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
          (EqualsOf ??)
          (EqualsExpression string int bool (TripleOf ??))
      )

type BoolKnown
  = BoolLiteral Bool
  | Equals (EqualsExpression String Int BoolKnown)
"""
                , Paragraph """The pieces don't seem to fit."""
                , Paragraph """Let's start again, with a simpler AST of only int, tuple and equals and a naive approach... Well, what would be a naive approach?"""
                , Paragraph """For past lue, tuples and especially triples shattered the hope of being able to safely represent them like this in an ast.
So much so in fact that lue was slowly losing interest and abandoned this project after a while."""
                , Paragraph """Much, much later... in fact only when writing this did I think of _two_-ish solutions that would have saved a good chunk of my sanity.
I know you're smarter than me, so if you have a free afternoon or whatever, maybe use this as a brain exercise?
Or just look at the solutions below."""
                , Paragraph """First the -ish solution:"""
                , ElmCode """
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
                , Paragraph """Expressions written down look passable, even if just barely. Here for `( 0, 0 == 0 ) == ( 0, 0 == 0 )`"""
                , ElmCode """
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
                , Paragraph """The one unsatisfying parts"""
                , UnorderedList
                    [ Sequence
                        [ Paragraph """`ExtendFirstX (OfY xy)` and `ExtendedSecondY (OfX xy)` are equivalent if the `xy` isn't nested further (and so only flat tuples are compared)"""
                        , UnorderedList
                            [ Paragraph """This, I'm sure can be ironed out on the type level [Citation needed]"""
                            ]
                        ]
                    , Sequence
                        [ Paragraph """I cannot, even now, think of a safe equivalent for triples"""
                        , UnorderedList
                            [ Paragraph """If it exists, it probably also grows rapidly in variant count"""
                            , Paragraph """If you think you found something, even if cursed, I beg you to drop me a line @lue on slack"""
                            ]
                        ]
                    ]
                , Paragraph """Strangely, with the second solution everything becomes eerily simple:"""
                , ElmCode """
type EqualsExpression
  = EqualsOfInt (EqualsOf Int)
  | EqualsOfExpression (EqualsOf EqualsExpression)
  | EqualsOfTuple { firsts : EqualsExpression, seconds : EqualsExpression }
  | EqualsOfTriple { firsts : EqualsExpression, seconds : EqualsExpression, thirds : EqualsExpression }
"""
                , Paragraph """Wtf?"""
                ]
        }


sectionTitleToUrl : String -> String
sectionTitleToUrl =
    \title ->
        title |> Url.percentEncode


toHtmlStringifiable : Content -> Html.String.Html event_
toHtmlStringifiable =
    \articleContent ->
        case articleContent of
            Section titled ->
                Html.String.section []
                    [ [ Html.String.text titled.title ]
                        |> Html.String.h3 []
                    , titled.content |> toHtmlStringifiable
                    ]

            Paragraph text ->
                Html.String.p []
                    [ Html.String.text text ]

            ElmCode rawSourceCodeString ->
                Html.String.code []
                    [ Html.String.text
                        (rawSourceCodeString
                            |> String.lines
                            |> List.Extra.dropWhile String.Extra.isBlank
                            |> List.Extra.dropWhileRight String.Extra.isBlank
                            |> String.join "\n"
                        )
                    ]

            Sequence contentList ->
                Html.String.div []
                    (contentList |> List.map toHtmlStringifiable)

            UnorderedList unorderedList ->
                Html.String.ul []
                    (unorderedList
                        |> List.map
                            (\item ->
                                Html.String.li []
                                    [ item |> toHtmlStringifiable ]
                            )
                    )
