module Articles exposing (Content(..), ParagraphPart(..), SectionCompletion(..), all, sectionTitleToUrl)

import ElmSyntaxHighlight
import List.Extra
import String.Extra
import Time
import Url


type Content
    = Section
        { title : String
        , description : String
        , completion : SectionCompletion
        , content : Content
        }
    | Paragraph (List ParagraphPart)
    | ElmCode ElmSyntaxHighlight.SyntaxHighlightable
    | UnorderedList (List Content)
    | Sequence (List Content)


type SectionCompletion
    = InProgress String
    | Published Time.Posix


type ParagraphPart
    = Text String
    | Italic String
    | InlineElmCode ElmSyntaxHighlight.SyntaxHighlightable
    | Link { description : String, url : String }


textOnlyParagraph : String -> Content
textOnlyParagraph text =
    Paragraph [ Text text ]


all : Content
all =
    Sequence
        [ introduction
        , yourAstAllowsListsWithDifferentElementTypesWhyArticle
        , aFunnyIdeaOnHowToRepresentAFractionSafelyArticle
        , typedValue8Article
        , whatToDoWithElmReviewErrorsArticle
        , Sequence
            [ Paragraph [ Text "Oki, that's it for the articles. Planned:" ]
            , UnorderedList
                [ Sequence
                    [ Paragraph
                        [ Text "\"elm-typesafe-radio\" series"
                        ]
                    , UnorderedList
                        [ Paragraph [ Text "phantom types" ]
                        , Paragraph [ Text "opaque types" ]
                        ]
                    ]
                ]
            ]
        , textOnlyParagraph """⸜(｡˃ ᵕ ˂ )⸝♡"""
        ]


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


aFunnyIdeaOnHowToRepresentAFractionSafelyArticle : Content
aFunnyIdeaOnHowToRepresentAFractionSafelyArticle =
    Section
        { title = "A funny idea on how to represent a fraction safely"
        , description = """We can define non-opaque, safe number types where every value is unique."""
        , completion = InProgress "Close to done (needs polish)"
        , content =
            Sequence
                [ textOnlyParagraph """Intuitively, you might think of"""
                , elmCode """
type Rational
    = N0
    | Signed { sign : Sign, numerator : Natural1Up, denominator : Natural1Up }

type Sign
    = Positive
    | Negative
"""
                , textOnlyParagraph """Annoyingly,
there can be different elm values that represent the same number
since numerator and denominator can share factors, like 3/7 and 6/14.
Packages usually resolve this by making the type opaque – surprisingly, we can do better!"""
                , textOnlyParagraph """Just before we get to that, there's something cool about defining Natural1Up as well that will be useful later.
The simplest way to define it would be"""
                , elmCode """
type Natural1Up
    = N1
    | Successor Natural1Up
"""
                , textOnlyParagraph """This won't do since for example just adding 1000000 + 1000000 requires 1000000 steps (in elm at least).
Luckily, computers do something smarter:"""
                , elmCode """
type Natural1Up
    = Natural1Up (NonEmptyList Bit)

type Bit
    = O
    | I
"""
                , Paragraph
                    [ Text """We have a similar problem to the rational type shown in the first example.
If we allow users to prepend """
                    , inlineElmCode "O"
                    , Text """s multiple elm values could represent the same number.
Which would mean that checking them for equality would return false, ugh.
So... guess we just have to make the type opaque?
Lucky for us, an actual solution isn't actually more work:"""
                    ]
                , elmCode """
type Natural1Up
    = Natural1Up { bit1FollowedBy : List Bit }
"""
                , textOnlyParagraph """A little awkward but it mirrors reality.
Oki, enough from natural numbers. Look at this safe representation of a rational number:"""
                , elmCode """
type alias Rational =
    Dict
        Prime
        { inNumeratorOrDenominator : PrimeFactorInNumeratorOrDenominator
        , exponent : Natural1Up
        }

type Prime
    = PrimeAtIndex Natural0Up

type PrimeFactorInNumeratorOrDenominator
    = PrimeFactorInNumerator
    | PrimeFactorInDenominator
"""
                , textOnlyParagraph """For the relevant primes, we write down whether the numerator or denominator has its corresponding prime as a factor and how often.
This works because in a simplified fraction, a prime can't be both a factor of the numerator and the denominator.
Looks all cool and clean!
But oh well..., actually making such a dict without opaque types is even beyond what lue can do..."""
                , textOnlyParagraph """Turns out we don't need a dict for this."""
                , elmCode """
type Rational
    = N0
    | Signed
        { sign : Sign
        , absolute :
            List (Maybe { inNumeratorOrDenominator : PrimeFactorInNumeratorOrDenominator, exponent : Natural1Up })
        }
"""
                , Paragraph
                    [ Text """Each index in the list corresponds to the same index in the list of primes: """
                    , inlineElmCode """[ 2, 3, 5, 7, 11, 13, 17, ..expression.. ]"""
                    , Text """.
Then, for each index, we write down whether the numerator or denominator has its corresponding prime as a factor and how often,
or if neither of them have that factor.
So to represent e.g. 8/5:"""
                    ]
                , elmCode """
Signed
    { sign = Positive
    , absolute =
        [ {-2-} Just { inNumeratorOrDenominator = PrimeFactorInNumerator, exponent = Natural.n3 }
        , {-3-} Nothing
        , {-5-} Just { inNumeratorOrDenominator = PrimeFactorInDenominator, exponent = Natural.n1 }
        ]
    }
"""
                , Paragraph
                    [ Text """You might have noticed that this is still not better than out original solution because we can add """
                    , inlineElmCode "Nothing"
                    , Text """s to the end of the list without the mathematical value changing.
We can use a trick similar to the one we used for natural numbers:
split the list into everything before the last which can contain """
                    , inlineElmCode "Nothing"
                    , Text """s and the last which can not:"""
                    ]
                , elmCode """
type Rational
    = N0
    | Signed
        { sign : Sign
        , absolute :
            { beforeLast : List (Maybe { inNumeratorOrDenominator : PrimeFactorInNumeratorOrDenominator, exponent : Natural1Up })
            , last : { inNumeratorOrDenominator : PrimeFactorInNumeratorOrDenominator, exponent : Natural1Up }
            }
        }
"""
                , textOnlyParagraph """beautiful."""
                , Paragraph
                    [ Text """Extra: Implementing operations on these number types is ongoing in """
                    , Link { description = "elm-number-safe", url = "https://github.com/lue-bird/elm-number-safe" }
                    ]
                ]
        }


whatToDoWithElmReviewErrorsArticle : Content
whatToDoWithElmReviewErrorsArticle =
    Section
        { title = "What to do with elm-review errors?"
        , description = """Something to try: Not fixing all elm-review errors immediately."""
        , completion = InProgress "Barely anything here yet. Come back in a month!"
        , content =
            Sequence
                [ textOnlyParagraph """Ever wanted to add helpers but introducing them at once would start a chain reaction of refactors?
Especially when the new helper will make existing helpers irrelevant, it can feel simplest to just get the big refactor done with."""
                , elmCode """
isNotFunction : Expression -> Bool
isNotFunction expression =
    case expression of
        Expression.Variable ( "Basics", "not" ) ->
            True
        
        _ ->
            False

isNegateFunction : Expression -> Bool
isNegateFunction expression =
    case expression of
        Expression.Variable ( "Basics", "negate" ) ->
            True
        
        _ ->
            False
"""
                , Paragraph [ Text "and you want to add" ]
                , elmCode """
isSpecificVariable specificFullyQualifiedVariableName =
    case expression of
        Expression.Variable fullyQualifiedVariableName ->
            fullyQualifiedVariableName == specificFullyQualifiedVariableName
        
        _ ->
            False
"""
                , Paragraph [ Text "If you feel like this (just like past and sometimes current lue), here's an alternative to try:" ]
                , Paragraph
                    [ Text "Do a small, local, immediate step. "
                    , Italic "Commit"
                    , Text ". If you're happy, slowly follow "
                    , Link { description = "elm-review", url = "https://dark.elm.dmy.fr/packages/jfmengels/elm-review/latest/" }
                    , Text " and compiler errors and your project's refactoring todo list items one at a time."
                    ]
                , Paragraph [ Text "Or just leave them for some time in the future." ]
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
                , textOnlyParagraph """TODO: Show step-by-step refactor of adding helper, adding @deprecated, fixing the issues one by one"""
                , textOnlyParagraph """If possible I'd like if elm-review doesn't slow this exploration phase...
→ Also, elm-review rules don't really "slow down development" because they just hint at and remind you of what's left to do eventually without forcing you to do anything. (e.g. you added this helper? Do your thing but I always have your back so you don't forget that you wanted to use this helper somewhere) TODO integrate"""
                ]
        }


yourAstAllowsListsWithDifferentElementTypesWhyArticle : Content
yourAstAllowsListsWithDifferentElementTypesWhyArticle =
    Section
        { title = "Your AST allows lists with different element types. Why?"
        , description = """Can you represent a list expression where all elements have the same type? Yes.
And what about operations like (==) on infinitely nested triples?"""
        , completion = Published (Time.millisToPosix 1697846400000)
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
                    [ Text "A good chunk of work later there were significant parts in place of an ambitious "
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
                , textOnlyParagraph """Having one type for all expression kinds in a single place is still a nice idea, tho:"""
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
    -- even records!
    | EqualsOfRecord (Dict String EqualsExpression)
"""
                , textOnlyParagraph """Wtf?"""
                ]
        }


typedValue8Article : Content
typedValue8Article =
    Section
        { title = "Wrapping wrappers safely: typed-value 8.0.0"
        , description = """Preserving the knowledge of what was wrapped when wrapping again.
typed-value 8.0.0 makes this safe."""
        , completion = Published (Time.millisToPosix 1698065536000)
        , content =
            Sequence
                [ Paragraph
                    [ Text "Let's build a generic set type which doesn't store functions but still safely allows custom, user-provided order functions similar to "
                    , Link { description = "KeysSet", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-keysset/latest/" }
                    , Text ". Showing the power of being able to wrap a generic typed, enabled by "
                    , Link { description = "Typed", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/" }
                    , Text " 8 (we'll get to what this means exactly, don't worry)"
                    ]
                , elmCode """
type alias GenericSet element uniqueOrder = ..Type..
type alias Ordering subject unique = ..Type..

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
                , Paragraph
                    [ Text "To guarantee that the order function inside a given "
                    , InlineElmCode [ { string = "Ordering", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                    , Text " is the same for every operation,"
                    ]
                , UnorderedList
                    [ Paragraph
                        [ Text "each unique "
                        , InlineElmCode [ { string = "Ordering", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                        , Text " needs to have a unique last type argument."
                        ]
                    , Paragraph
                        [ InlineElmCode [ { string = "GenericSet", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                        , Text " needs to enforce that all operations need an "
                        , InlineElmCode [ { string = "Ordering", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                        , Text " with the same "
                        , inlineElmCode "unique"
                        , Text " type argument."
                        ]
                    ]
                , Paragraph
                    [ Text "Why not just use a normal opaque type which wraps the order function to order the elements instead of this "
                    , InlineElmCode [ { string = "Ordering", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                    , Text """ type? Not a bad idea! But try to get the actual order function out of any opaque type... Any attempts to create a public accessor don't quite work either, for example"""
                    ]
                , elmCode """
type alias Ordering subject opaque =
    { opaque : opaque, toFunction : opaque -> (( subject, subject ) -> Order) }

fakeOrdering : Ordering ..Type.. RealOpaque
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
        Checked -- only constructible using the tag ↓
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
    = Increasing -- variant not exposed
"""
                , Paragraph [ Text "First attempt to fake it:" ]
                , elmCode """
fakeIntOrder : Ordering Int Int.Order.Increasing
fakeIntOrder =
    -- type error: is Tagged but should be Checked
    Int.Order.increasing |> Typed.map (\\_ -> \\_ -> EQ)
"""
                , Paragraph [ Text "Second attempt to fake it:" ]
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
                , Paragraph [ Text "All that was already possible way before 8.0.0." ]
                , Paragraph
                    [ Text "Now... How do we define "
                    , inlineElmCode "type alias GenericSet element uniqueOrder = ..Type.."
                    , Text " or an "
                    , inlineElmCode "Order.reverse"
                    , Text " which sorts in opposite order?"
                    ]
                , elmCode """
type Reverse tag
    = Reverse tag

reverse : Ordering subject tag -> Ordering subject (Reverse tag)
reverse =
    Typed.mapTo (Reverse ??expression??) (\\order -> \\( a, b ) -> order ( b, a ))
"""
                , Paragraph
                    [ Text "Intuitively, you might want to reach for unsafe phantom types 🤮"
                    ]
                , elmCode """
type Reverse reverseOrderTag = Reverse

reverse : Ordering subject tag -> Ordering subject (Reverse tag)
reverse =
    Typed.mapTo Reverse (\\order -> \\a b -> order b a)

reverseOops : Ordering subject orderTag -> Ordering subject (Reverse tag)
reverseOops =
    Typed.mapTo Reverse (\\order -> \\a b -> order b a)
"""
                , Paragraph
                    [ inlineElmCode "orderTag"
                    , Text " and "
                    , inlineElmCode "tag"
                    , Text " are different type variables, so the tag of the reversed ordering can accidentally be anything. It's a free variable :("
                    ]
                , Paragraph
                    [ Text "Here's a similarly buggy example:"
                    ]
                , elmCode """
type GenericSet element orderTag
    = GenericSet (Internals element)

fromListOops :
    Ordering element tag
    -> (List element -> GenericSet element orderTag)
fromListOops elementOrdering =
    \\list ->
        GenericSet (Internals.fromList (elementOrdering |> Typed.untag) list)
"""
                , Paragraph
                    [ Text " What's new in 8.0.0 is how we can preserve tags in the type while wrapping a "
                    , Link { description = "Typed", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-typed-value/latest/" }
                    , Text ":"
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
                    [ Text "We can use the same technique to finally fill in the "
                    , inlineElmCode "type alias GenericSet element uniqueOrder = ..Type.."
                    , Text ":"
                    ]
                , elmCode """
type alias GenericSet element orderTag =
    Typed Checked ( GenericSetTag, orderTag ) Internal (Internals element)

type GenericSetTag = GenericSetTag -- variant not exposed

fromList :
    Ordering element tag
    -> (List element -> GenericSet element tag)
fromList elementOrdering =
    \\list ->
        elementOrdering
            |> Typed.mapToWrap GenericSetTag
                (\\orderFunction -> Internals.fromList orderFunction list)
"""
                , textOnlyParagraph """Frankly, using tuples for multiple tag arguments in type signatures can get a bit unreadable. A quick solution:"""
                , elmCode """
type alias Reverse reverseOrderTag =
    ( ReverseTag, reverseOrderTag )

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
