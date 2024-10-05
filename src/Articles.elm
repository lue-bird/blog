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
        , recommendationsForFurtherSurfing
        , yourAstAllowsListsWithDifferentElementTypesWhyArticle
        , aFunnyIdeaForRepresentingAFractionSafelyArticle
        , typedValue8Article
        , theSimplestAppDefinitionArticle
        , theElmIcebergArticle
        , whatToDoWithElmReviewErrorsArticle
        , Sequence
            [ Paragraph [ Text "Oki, that's it for the articles." ]
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


recommendationsForFurtherSurfing : Content
recommendationsForFurtherSurfing =
    Section
        { title = "recommendations for further surfing"
        , description = "A bunch of places you might want to visit from here"
        , completion = InProgress "always changing, never \"done\""
        , content =
            Sequence
                [ UnorderedList
                    [ [ Link { description = "articles about an open web by Rohan Kumar", url = "https://seirdy.one/posts/" } ]
                        |> Paragraph
                    , [ Link { description = "articles about static analysis by Jeroen Engels", url = "https://jfmengels.net/" } ]
                        |> Paragraph
                    , [ Link { description = "podcast about personal programmer stories by Lindsay Wardell", url = "https://podcasters.spotify.com/pod/show/humansideofdev/episodes/8---All-About-Management-with-Blake-Thomas-e2j7s2h" } ]
                        |> Paragraph
                    , [ Link { description = "articles mostly about functional programming by Michael Hendricks", url = "https://m.ndrix.org/a/" } ]
                        |> Paragraph
                    ]
                , "all support rss" |> textOnlyParagraph
                ]
        }


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


aFunnyIdeaForRepresentingAFractionSafelyArticle : Content
aFunnyIdeaForRepresentingAFractionSafelyArticle =
    Section
        { title = "A funny idea for representing a fraction safely"
        , description = """We can define non-opaque, safe number types where every value is unique."""
        , completion = Published (Time.millisToPosix 1705449600000)
        , content =
            Sequence
                [ textOnlyParagraph """A definition like ↓ seems intuitive"""
                , elmCode """
type Rational
    = N0
    | Signed { sign : Sign, numerator : Natural1Up, denominator : Natural1Up }

type Sign
    = Positive
    | Negative
"""
                , textOnlyParagraph """Looks pretty safe.
Annoyingly,
there can be different elm values that represent the same number
since numerator and denominator can share factors, like 3/7 and 6/14.
Checking these for equality would return false, ugh.
Packages usually resolve this by making the type opaque – surprisingly, we can do better!"""
                , Paragraph
                    [ Text """Just before we get to that, let's define """
                    , InlineElmCode [ { string = "Natural1Up", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                    , Text """."""
                    ]
                , elmCode """
type Natural1Up
    = N1
    | Successor Natural1Up
"""
                , textOnlyParagraph """↑ This won't do. Just adding 1000000 + 1000000 would take 1000000 steps (in elm at least)."""
                , elmCode """
type Natural1Up
    = Natural1Up (NonEmptyList Bit)

type Bit
    = O
    | I
"""
                , Paragraph
                    [ Text """↑ looks the most intuitive but similar to the """
                    , InlineElmCode [ { string = "Rational", syntaxKind = Just ElmSyntaxHighlight.Type } ]
                    , Text """ type above,
if we allow users to prepend """
                    , inlineElmCode "O"
                    , Text """s, multiple elm values could represent the same number."""
                    ]
                , Paragraph
                    [ Text """
So... we do have to make the type opaque, just as """
                    , Link { description = "elm-radio taught us", url = "https://elm-radio.com/episode/intro-to-opaque-types" }
                    , Text """?
Not so fast, the solution doesn't actually mean more work:"""
                    ]
                , elmCode """
type Natural1Up
    = Natural1Up { bit1FollowedBy : List Bit }
"""
                , textOnlyParagraph """A little awkward but it mirrors reality.
Oki, enough about natural numbers. Have a look at this cute representation of a rational number:"""
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
                    [ Text """You might have noticed that this is still not better than our original solution because users can add """
                    , inlineElmCode "Nothing"
                    , Text """s to the end of the list without the mathematical value changing.
We can use a trick similar to the one we used for natural numbers:
split the list into the last element which can not contain """
                    , inlineElmCode "Nothing"
                    , Text """ and everything before which can:"""
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


theSimplestAppDefinitionArticle : Content
theSimplestAppDefinitionArticle =
    Section
        { title = "The simplest app definition"
        , description = "The simplest architecture to define apps"
        , completion = Published (Time.millisToPosix 1712426002312)
        , content =
            Sequence
                [ "🔦 Imagine a flashlight app with a switch that turns on the light when it's off and vice versa." |> textOnlyParagraph
                , UnorderedList
                    [ """📡💭 The app can detect the exact moment the switch is toggled. Since the switch should to do the opposite on the next press, it can remember whether the light was switched on or off"""
                        |> textOnlyParagraph
                    , "✎ The app can turn the physical light on or off"
                        |> textOnlyParagraph
                    ]
                , "So in general, an app definition has to allow" |> textOnlyParagraph
                , UnorderedList
                    [ """📡💭 detecting and remembering what happens on the outside""" |> textOnlyParagraph
                    , "✎ triggering actions on the outside"
                        |> textOnlyParagraph
                    ]
                , "In the simplest app definition I could come up with, we end up with" |> textOnlyParagraph
                , UnorderedList
                    [ [ Text "💭 A value to represent what the app remembers or better: what it knows. Let's call it ", Italic "state" ]
                        |> Paragraph
                    , "💭 A state to represent that the app has just been started and so doesn't remember anything"
                        |> textOnlyParagraph
                    , "✎ A way to trigger actions on the outside based on what the app knows"
                        |> textOnlyParagraph
                    , "📡 A way to keep an eye on stuff on the outside depending on what the app knows, coupled with how something detected on the outside changes the state"
                        |> textOnlyParagraph
                    ]
                , "so in code this would look something like this:"
                    |> textOnlyParagraph
                , elmCode """
type InterfaceWithTheOutside whatComesBack
    = DetectorOnTheOutside (DetectorOnTheOutside whatComesBack)
    | ActionOnTheOutside ActionOnTheOutside

type JustStartedOr runningState
    = JustStartedSoItKnowsNothing
    | RunningState runningState

anyApp : JustStartedOr runningState -> List (InterfaceWithTheOutside runningState)
anyApp = ..expression..
"""
                , "The whole app signature defined in one line as a single function, almost insulting!" |> textOnlyParagraph
                , "How these \"interface\" types look like depends on the platform, nothing you have to do as a user. For our flashlight, it's something like" |> textOnlyParagraph
                , elmCode """
type DetectorOnTheOutside whatComesBack
    = SwitchToggled whatComesBack

type ActionOnTheOutside
    = PhysicalLightOn
    | PhysicalLightOff
"""
                , "A flashlight app which on startup sets the light to on could look something like"
                    |> textOnlyParagraph
                , elmCode """

type LightActivation
    = LightOn
    | LightOff

flashlightApp : JustStartedOr LightActivation -> List (InterfaceWithTheOutside LightActivation)
flashlightApp =
    \\justStartedOrRunning ->
        let
            lightActivation : LightActivation
            lightActivation =
                case justStartedOrRunning of
                    JustStartedSoItKnowsNothing ->
                        LightOn
                    
                    RunningState lightActivation ->
                        lightActivation
        in
        case lightActivation of
            LightOn ->
                [ ActionOnTheOutside PhysicalLightOn
                , DetectorOnTheOutside (SwitchToggled LightOff)
                ]

            LightOff ->
                [ ActionOnTheOutside PhysicalLightOff
                , DetectorOnTheOutside (SwitchToggled LightOn)
                ]
"""
                , "It's almost eerie how we can say \"That's it!\""
                    |> textOnlyParagraph
                , [ Text "In practice, the state "
                  , InlineElmCode [ { syntaxKind = ElmSyntaxHighlight.Variant |> Just, string = "JustStartedSoItKnowsNothing" } ]
                  , Text " is always equivalent to some "
                  , InlineElmCode [ { syntaxKind = ElmSyntaxHighlight.Variant |> Just, string = "RunningState" } ]
                  , Text ". Like, when you have a home screen, you want to be able to return to it. So we can make this simplification"
                  ]
                    |> Paragraph
                , elmCode """
type InterfaceWithTheOutside whatComesBack
    = DetectorOnTheOutside ..Type..
    | ActionOnTheOutside ..Type..

anyApp :
    { initialState : state
    , interface : state -> List (InterfaceWithTheOutside state)
    }
anyApp = ..expression..
"""
                , "With that, our flashlight app is now"
                    |> textOnlyParagraph
                , elmCode """

type LightActivation
    = LightOn
    | LightOff

flashlightApp : LightActivation -> List (InterfaceWithTheOutside LightActivation)
flashlightApp =
    { initialState = LightOn
    , interface =
        \\lightActivation ->
            case lightActivation of
                LightOn ->
                    [ ActionOnTheOutside PhysicalLightOn
                    , DetectorOnTheOutside (SwitchToggled LightOff)
                    ]

                LightOff ->
                    [ ActionOnTheOutside PhysicalLightOff
                    , DetectorOnTheOutside (SwitchToggled LightOn)
                    ]
    }
"""
                , "Pretty cool, ey?"
                    |> textOnlyParagraph
                , "And we almost by accident managed to avoid hard problems that almost every framework has:" |> textOnlyParagraph
                , UnorderedList
                    [ """Seeing stuff on the outside that should be impossible based on what we remember, like seeing a click on a button on a different page"""
                        |> textOnlyParagraph
                    , "Triggering an outside action based on a specific user action. For example, having to edit relevant parts of the ui, the url, the stored files, the currently playing audios etc based on user behaviour"
                        |> textOnlyParagraph
                    ]
                , "Try going through frameworks you already know and find cases where these issues pop up." |> textOnlyParagraph
                , Paragraph
                    [ "Good news at the end: For the web, this architecture has already been implemented: " |> Text
                    , Link
                        { description = "elm-state-interface"
                        , url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-state-interface/latest/"
                        }
                    ]
                ]
        }


theElmIcebergArticle : Content
theElmIcebergArticle =
    Section
        { title = "The elm iceberg"
        , description = "what deep secrets lie below us"
        , completion = InProgress "still collecting bits and pieces and code formatting"
        , content =
            Sequence
                [ "Crust" |> textOnlyParagraph
                , UnorderedList
                    [ """record setter can't directly update qualified reference""" |> textOnlyParagraph
                    , [ "The same qualification can point to different modules → " |> Text
                      , inlineElmCode "import List.Extra as List"
                      ]
                        |> Paragraph
                    , """some literals have no corresponding patterns → negative Int, Float"""
                        |> textOnlyParagraph
                    , """main can be of type Html"""
                        |> textOnlyParagraph
                    , [ "== can crash → " |> Text
                      , Link { description = "function, Json.Decode.Value, Regex", url = "https://dark.elm.dmy.fr/packages/elm/core/latest/Basics#==" }
                      ]
                        |> Paragraph
                    , [ "Html.Attributes are sometimes not equivalent to the html attributes with the same name → " |> Text
                      , Link { description = "Html.Attributes.value is a js property", url = "https://github.com/elm/html/blob/1.0.0/src/Html/Attributes.elm#L439-L441" }
                      , ", ..." |> Text
                      ]
                        |> Paragraph
                    , [ "elm can run outside of the browser → " |> Text
                      , Link { description = "Platform.worker", url = "https://dark.elm.dmy.fr/packages/elm/core/latest/Platform#worker" }
                      ]
                        |> Paragraph
                    , [ "elm on the backend → " |> Text
                      , Link { description = "elm studio", url = "https://www.elm.studio/" }
                      , ", " |> Text
                      , Link { description = "lamdera", url = "https://www.lamdera.com/" }
                      , ", " |> Text
                      , Link { description = "pine", url = "https://github.com/pine-vm/pine" }
                      , ", " |> Text
                      , Link { description = "elm-pages", url = "https://elm-pages.com/" }
                      , ", ..." |> Text
                      ]
                        |> Paragraph
                    , [ "json encoder and decoder can be created in one: " |> Text
                      , packageLink "miniBill/elm-codec"
                      , ", " |> Text
                      , packageLink "MartinSStewart/elm-serialize"
                      , ", ..." |> Text
                      ]
                        |> Paragraph
                    , [ "Dict and Set types with arbitrary key types exist → " |> Text
                      , packageLink "pzp1997/assoc-list"
                      , ", " |> Text
                      , packageLink "owanturist/elm-avl-dict"
                      , ", " |> Text
                      , packageLink "miniBill/elm-generic-dict"
                      , ", " |> Text
                      , packageLink "turboMaCk/any-dict"
                      , ", ..." |> Text
                      ]
                        |> Paragraph
                    , """import aliases can't contain dots""" |> textOnlyParagraph
                    , [ "elm-lang.org contains a TODO → " |> Text
                      , Link { description = "section on url parsing", url = "https://guide.elm-lang.org/webapps/url_parsing" }
                      , " under Synthesis" |> Text
                      ]
                        |> Paragraph
                    , [ "there is a type for a value that's impossible to ever construct and it's very useful → " |> Text
                      , Link { description = "Never", url = "https://dark.elm.dmy.fr/packages/elm/core/latest/Basics#Never" }
                      , ", " |> Text
                      , Link { description = "never", url = "https://dark.elm.dmy.fr/packages/elm/core/latest/Basics#never" }
                      ]
                        |> Paragraph
                    ]
                , "Mantle" |> textOnlyParagraph
                , UnorderedList
                    [ [ "andMap = map2 (|>)" |> inlineElmCode
                      , " → " |> Text
                      , Link { description = "article \"Running Out of Maps\" by Joël Quenneville", url = "https://thoughtbot.com/blog/running-out-of-maps" }
                      ]
                        |> Paragraph
                    , [ inlineElmCode "modBy 0", " and other operations can throw runtime errors" |> Text ]
                        |> Paragraph
                    , [ "Int is unsound → " |> Text, inlineElmCode "2^ -1 == 0.5", " : Int" |> Text ] |> Paragraph
                    , """main can be of type Svg"""
                        |> textOnlyParagraph
                    , """type parameters that aren't used still make the base type different to the compiler → phantom types"""
                        |> textOnlyParagraph
                    , [ "the implicit record type alias constructor functions are not created when there is indirection or the record is extensible → " |> Text
                      , Link { description = "summary on situations where constructor is not created", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-no-record-type-alias-constructor-function/latest#only-works-in-very-limited-scenarios" }
                      ]
                        |> Paragraph
                    , """effect module where"""
                        |> textOnlyParagraph
                    , """It's basically impossible to use both Parser and Parser.Advanced in the same module → both expose the same operators and these can't be qualified"""
                        |> textOnlyParagraph
                    , [ Link { description = "Bitwise.shiftRightZfBy", url = "https://dark.elm.dmy.fr/packages/elm/core/latest/Bitwise#shiftRightZfBy" }
                      ]
                        |> Paragraph
                    , [ "thread blocked indefinitely in an MVar operation and Map.!: given key is not an element in the map → let, (mutual) recursion, lambda, exports, missing annotations → " |> Text
                      , Link { description = "summary issue on blocking", url = "https://github.com/gren-lang/compiler/issues/105" }
                      , ", " |> Text
                      , Link { description = "summary issue on missing key", url = "https://github.com/gren-lang/compiler/issues/104" }
                      , " ..." |> Text
                      ]
                        |> Paragraph
                    , [ "elm was picked partially because it sounds like element → " |> Text
                      , Link { description = "google groups chat with evan", url = "https://groups.google.com/g/elm-discuss/c/S4zbHJWPXvU/m/JyavEHDDQucJ" }
                      ]
                        |> Paragraph
                    , [ inlineElmCode "import List exposing (List)"
                      , " is invalid → " |> Text
                      , Link { description = "elm/core issue", url = "https://github.com/elm/core/issues/1037" }
                      ]
                        |> Paragraph
                    ]
                , "Outer core" |> textOnlyParagraph
                , UnorderedList
                    [ [ Text "fold/TCO recursion into generators, decoders or anything represented as a function is stack unsafe → "
                      , Link { description = "article \"An Elm debugging story\" by Joël Quenneville", url = "https://thoughtbot.com/blog/elm-debugging-story" }
                      ]
                        |> Paragraph
                    , [ "Micro performance improvements → adding " |> Text
                      , inlineElmCode "variable ++ \"\""
                      , " to a appended string variables, converting " |> Text
                      , inlineElmCode "aComparable /= bComparable"
                      , " to " |> Text
                      , inlineElmCode "aComparable < bComparable || aComparable > bComparable"
                      , ", avoiding currying and composition" |> Text
                      ]
                        |> Paragraph
                    , [ "obscure Platform primitives → " |> Text
                      , Link { description = "Platform.sendToSelf", url = "https://dark.elm.dmy.fr/packages/elm/core/latest/Platform#sendToSelf" }
                      , ", " |> Text
                      , Link { description = "Platform.sendToApp", url = "https://dark.elm.dmy.fr/packages/elm/core/latest/Platform#sendToApp" }
                      , ", ..." |> Text
                      ]
                        |> Paragraph
                    , """main is kind of a reserved word → you can't have a top-level expose with that name if the type is not either Html, Svg or Program"""
                        |> textOnlyParagraph
                    , [ Text "multiline string pattern is valid elm → "
                      , Link { description = "issue in elm-syntax", url = "https://github.com/stil4m/elm-syntax/issues/134" }
                      ]
                        |> Paragraph
                    , """the fish operators"""
                        |> textOnlyParagraph
                    , [ "a phantom type can store an arbitrary, extensible amount of knowledge about the contained value → extensible phantom record builder, see e.g. " |> Text
                      , Link { description = "video The phantom builder pattern by Jeroen Engels", url = "https://www.youtube.com/watch?v=Trp3tmpMb-o" }
                      ]
                        |> Paragraph
                    , [ inlineElmCode "(&&)"
                      , " binds more than " |> Text
                      , inlineElmCode "(||)"
                      , " → " |> Text
                      , inlineElmCode "False && False || True"
                      , " is " |> Text
                      , inlineElmCode "True"
                      , " while " |> Text
                      , inlineElmCode "False && (False || True)"
                      , " is " |> Text
                      , inlineElmCode "False"
                      ]
                        |> Paragraph
                    , [ "you don't have to nest andThens → " |> Text
                      , packageLink "mtamc/and-collect"
                      ]
                        |> Paragraph
                    , [ "crash through packages → " |> Text
                      , packageLink "jjant/unwrap"
                      ]
                        |> Paragraph
                    ]
                , "Inner core" |> textOnlyParagraph
                , UnorderedList
                    [ [ [ "you can the called function itself can provide itself to its argument, allowing single calls with variable arguments and result types like " |> Text
                        , "(|>) 3 plus 4 plus 5 identity" |> inlineElmCode
                        , " being equal to " |> Text
                        , "12" |> inlineElmCode
                        , " → " |> Text
                        , Link { description = "nice, in-depth article \"Fold\" by by Matthew Fluet", url = "http://mlton.org/Fold" }
                        , ", and if you have trouble understanding the initial code, try my plus example, work up your understanding from " |> Text
                        ]
                            |> Paragraph
                      , elmCode """
plus : Int -> Int -> (Int -> next) -> next
plus toAdd =
    \\soFar -> (|>) (soFar + toAdd)

summed =
    (|>) 0 (plus 1) (plus 2) (plus 3) identity


plus2 : Int -> Int -> (Int -> next) -> next
plus2 =
    \\soFar -> \\toAdd -> (|>) (soFar + toAdd)

summed2 =
    (|>) 0 plus 1 plus 2 plus 3 identity
"""
                      , [ "The fact that we can also build up a function that we can generically run in the end is then not quite as surprising and more an extra"
                            |> Text
                        ]
                            |> Paragraph
                      ]
                        |> Sequence
                    , [ "typesafe n-vectors → " |> Text
                      , Link { description = "static-array", url = "https://dark.elm.dmy.fr/packages/Orasund/elm-static-array/latest/" }
                      , ", " |> Text
                      , Link { description = "typesafe-array", url = "https://dark.elm.dmy.fr/packages/lue-bird/elm-typesafe-array/latest/" }
                      ]
                        |> Paragraph
                    , [ Link { description = "List.minimum", url = "https://dark.elm.dmy.fr/packages/elm/core/latest/List#minimum" }
                      , " & friends are different depending on list order → having tuples with NaN first lets elm keep the first one, see e.g. " |> Text
                      , Link { description = "elm-review-simplify comment", url = "https://github.com/jfmengels/elm-review-simplify/issues/306#issuecomment-2063461710" }
                      ]
                        |> Paragraph
                    , [ "elm once had higher-kinded types and typeclasses on it's rough roadmap → " |> Text
                      , Link { description = "issue comment about higher-kinded types", url = "https://github.com/elm/compiler/issues/396#issuecomment-128190898" }
                      , ", " |> Text
                      , Link { description = "youtube video mentioning typeclass plans around 5:40", url = "https://www.youtube.com/watch?v=vF03oQu7rkw" }
                      ]
                        |> Paragraph
                    , [ "endo operation type arguments can be hidden through recursion → " |> Text
                      , Link { description = "Demystifying Jeremy's interfaces", url = "https://discourse.elm-lang.org/t/demystifying-jeremys-interfaces/8834" }
                      ]
                        |> Paragraph
                    , [ """you can monkey patch elm's Http requests to perform tasks → """
                            |> Text
                      , Link { description = "lobanov/elm-taskport", url = "https://dark.elm.dmy.fr/packages/lobanov/elm-taskport/latest/" }
                      ]
                        |> Paragraph
                    , [ """you can edit a js object prototype to overwrite existing features"""
                            |> Text
                      ]
                        |> Paragraph
                    , [ "you can set js variables with the same name as generated by elm to e.g. create an elm equivalent of ts any → " |> Text
                      , packageLink "linsyking/elm-anytype"
                      ]
                        |> Paragraph
                    , [ "you can directly call js functions from elm and some packages use it → " |> Text
                      , Link { description = "randomness ellie", url = "https://ellie-app.com/hpXzJxh4HRda1" }
                      , ", " |> Text
                      , Link { description = "WebAudio.Context.currentTime", url = "https://dark.elm.dmy.fr/packages/hayleigh-dot-dev/elm-web-audio/latest/WebAudio-Context#currentTime" }
                      ]
                        |> Paragraph
                    , """semantic versioning is broken in small details → e.g. number → comparable for result types not being considered major"""
                        |> textOnlyParagraph
                    ]
                , "No light reaches this place" |> textOnlyParagraph
                , UnorderedList
                    [ [ "edkelly303/elm-any-type-forms, edkelly303/elm-multitool → " |> Text
                      , Link { description = "Control.tag0", url = "https://dark.elm.dmy.fr/packages/edkelly303/elm-any-type-forms/latest/Control#tag0" }
                      , " and friends" |> Text
                      ]
                        |> Paragraph
                    ]
                , [ "Hey, there's likely a lot more out there that I forgor or don't know about. Please " |> Text
                  , Link { description = "suggest them", url = "https://github.com/lue-bird/blog/issues/new" }
                  , " so they can be added here" |> Text
                  ]
                    |> Paragraph
                ]
        }


elm20AnnouncementShitpostArticle : Content
elm20AnnouncementShitpostArticle =
    Section
        { title = "elm 0.20.0 announcement"
        , description = "elm 0.20.0 is finally here."
        , completion = InProgress "this is not real"
        , content =
            Sequence
                [ Paragraph [ Italic "⚠ shitpost" ]
                , Paragraph
                    [ "Evan has been experimenting on the language for the past few years and things have finally reached a coherent set of changes."
                        |> Text
                    , """A few community members gave been approached in the past year to help take over the communication part of elm for within the community and for the public
so Evan can focus on what he is excited for. As part of that push I'm proud to present the new stable elm compiler!"""
                        |> Text
                    ]
                , UnorderedList
                    [ Paragraph
                        [ Text "removed tuples and triples. THis also means elm/core has no Tuple module anymore"
                        ]
                    , Paragraph
                        [ Text "removed record pattern where variable names are inherited from destructured field names"
                        ]
                    , Paragraph
                        [ Text "removed automatic record type alias constructor functions"
                        ]
                    , Paragraph
                        [ Text "modules are dead, long live packages. This means that instead of String.fromInt and String.toInt you now use intToString and intToString"
                        ]
                    , Paragraph
                        [ Text "elm.json is now configuration directly in elm code"
                        ]
                    , Paragraph
                        [ Text "new record syntax: ( Name \"Franziska\" , Status \"Hi!\" ) : ( Name String , Status String ). Note that single field syntax and variant syntax are identical"
                        ]
                    , Paragraph
                        [ Text "structural variants: AnonymousUser : ( AnonymousUser | LoggedInUser ( Email Email, Handle String ) ). Sometimes, we just want a one-off way to represent choice."
                        ]
                    , Paragraph
                        [ Text "A reworked architecture: state-interface. This means Platform.Cmd, Platform.Sub, Task, Process and everything Platform function beside worker has been removed"
                        ]
                    , Paragraph
                        [ Text "removed elm/url in favor of elm-app-url"
                        ]
                    , Paragraph
                        [ Text "removed elm/regex in favor of elm/parser. We didn't want to have a core package that allows you to write bad elm code so we removed it."
                        ]
                    , Paragraph
                        [ Text "moved elm/virtual-dom into elm/browser."
                        ]
                    ]
                ]
        }


packageLink : String -> ParagraphPart
packageLink name =
    Link
        { description = name
        , url = [ "https://dark.elm.dmy.fr/packages/", name, "/latest/" ] |> String.concat
        }


sectionTitleToUrl : String -> String
sectionTitleToUrl =
    \title ->
        title |> Url.percentEncode
