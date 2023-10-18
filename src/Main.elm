port module Main exposing (main)

{-| -}

import Audio exposing (AudioData)
import Browser
import Browser.Dom
import Browser.Events
import Color exposing (Color)
import Dict exposing (Dict)
import Duration
import Element.WithContext
import Element.WithContext.Background
import Element.WithContext.Font
import Html exposing (Html)
import Json.Decode
import Json.Encode
import Key
import List.Extra
import Random
import Reaction exposing (Reaction)
import RecordWithoutConstructorFunction exposing (RecordWithoutConstructorFunction)
import SyntaxHighlight
import Task
import Time


type Event
    = AudioLoaded { piece : AudioKind, result : Result Audio.LoadError Audio.Source }
    | GameWindowSized { width : Float, height : Float }
    | InitialRandomSeedReceived Random.Seed
    | FrameTickPassed Time.Posix
    | KeyPressed Key.Key
    | KeyReleased Key.Key


type alias State =
    RecordWithoutConstructorFunction
        { audio : EachAudio (Result Audio.LoadError Audio.Source)
        , windowSize : { width : Float, height : Float }
        , audioTimes : EachAudio (List Time.Posix)
        , keysPressed : List Key.Key
        , randomSeed : Random.Seed
        , lastTick : Time.Posix
        }


type Effect
    = LoadAudio AudioKind
    | RequestInitialRandomSeed
    | GameRequestInitialWindowSize


main : Program () (Audio.Model Event State) (Audio.Msg Event)
main =
    Audio.documentWithAudio
        { init =
            init >> Reaction.toTuple3 interpretEffect
        , update =
            \_ event ->
                reactTo event >> Reaction.toTuple3 interpretEffect
        , subscriptions =
            \_ -> subscriptions
        , view =
            \_ -> uiDocument
        , audio = audio
        , audioPort =
            { toJS = audioPortToJS
            , fromJS = audioPortFromJS
            }
        }


audioKinds : List AudioKind
audioKinds =
    [ AudioRoomChange ]


init : () -> Reaction State Effect
init () =
    Reaction.to
        { audio = eachAudio (Err Audio.UnknownError)
        , windowSize =
            -- dummy
            { width = 0, height = 0 }
        , audioTimes = eachAudio []
        , keysPressed = []
        , randomSeed =
            -- dummy
            Random.initialSeed 1635127483
        , lastTick =
            -- dummy
            Time.millisToPosix -1
        }
        |> Reaction.effectsAdd
            [ RequestInitialRandomSeed
            , GameRequestInitialWindowSize
            ]
        |> Reaction.effectsAdd
            (audioKinds |> List.map LoadAudio)


eachAudio : perKind -> EachAudio perKind
eachAudio perKind =
    { roomChange = perKind
    }


reactTo : Event -> (State -> Reaction State Effect)
reactTo event =
    case event of
        AudioLoaded audioLoaded ->
            \state ->
                Reaction.to
                    { state
                        | audio =
                            state.audio
                                |> alterAudioOfKind audioLoaded.piece (\_ -> audioLoaded.result)
                    }

        GameWindowSized size ->
            \state -> Reaction.to { state | windowSize = size }

        InitialRandomSeedReceived initialRandomSeed ->
            \state ->
                Reaction.to
                    { state | randomSeed = initialRandomSeed }

        FrameTickPassed newSimulationTime ->
            \state ->
                let
                    sinceLastTick =
                        Duration.from state.lastTick newSimulationTime
                in
                Reaction.to
                    { state
                        | lastTick = newSimulationTime
                    }

        KeyPressed key ->
            \state ->
                Reaction.to
                    { state | keysPressed = state.keysPressed |> (::) key }

        KeyReleased key ->
            \state ->
                Reaction.to
                    { state
                        | keysPressed =
                            state.keysPressed |> List.filter (\keyPressed -> keyPressed /= key)
                    }


alterAudioOfKind : AudioKind -> (a -> a) -> EachAudio a -> EachAudio a
alterAudioOfKind kind f =
    case kind of
        AudioRoomChange ->
            \r -> { r | roomChange = r.roomChange |> f }


subscriptions : State -> Sub Event
subscriptions =
    \_ ->
        [ Browser.Events.onResize
            (\width height ->
                { width = width |> toFloat, height = height |> toFloat }
                    |> GameWindowSized
            )
        , Browser.Events.onAnimationFrame FrameTickPassed
        , Browser.Events.onKeyDown (Json.Decode.map KeyPressed Key.decoder)
        , Browser.Events.onKeyUp (Json.Decode.map KeyReleased Key.decoder)
        ]
            |> Sub.batch


interpretEffect : Effect -> Reaction.EffectInterpretation Event
interpretEffect =
    \effect ->
        case effect of
            LoadAudio piece ->
                Reaction.audioCommands
                    [ Audio.loadAudio
                        (\result -> AudioLoaded { result = result, piece = piece })
                        ([ "public/", piece |> audioPieceToName, ".mp3" ] |> String.concat)
                    ]

            RequestInitialRandomSeed ->
                Reaction.commands [ Random.independentSeed |> Random.generate InitialRandomSeedReceived ]

            GameRequestInitialWindowSize ->
                Reaction.commands
                    [ Browser.Dom.getViewport
                        |> Task.perform
                            (\viewport ->
                                { width = viewport.viewport.width
                                , height = viewport.viewport.height
                                }
                                    |> GameWindowSized
                            )
                    ]


audioPieceToName : AudioKind -> String
audioPieceToName =
    \audioPiece ->
        case audioPiece of
            AudioRoomChange ->
                "room-change"


uiDocument : State -> Browser.Document Event
uiDocument =
    \state ->
        { title = "lue blog"
        , body =
            state |> ui |> List.singleton
        }


ui : State -> Html Event
ui _ =
    Element.WithContext.column
        [ Element.WithContext.spacing 20
        , Element.WithContext.paddingXY 70 40
        ]
        [ ArticleContentSequence
            [ aSaferAstArticle
            , whatToDoWithElmReviewErrorsArticle
            ]
            |> articleContentUi
        , Html.node "style" [] [ Html.text """.elmsh {color: #ffffff;background: #000000;}.elmsh-hl {background: #343434;}.elmsh-add {background: #003800;}.elmsh-del {background: #380000;}.elmsh-comm {color: #75715e;}.elmsh1 {color: #ae81ff;}.elmsh2 {color: #e6db74;}.elmsh3 {color: #f92672;}.elmsh4 {color: #66d9ef;}.elmsh5 {color: #a6e22e;}.elmsh6 {color: #ae81ff;}.elmsh7 {color: #fd971f;}.elmsh-elm-ts, .elmsh-js-dk, .elmsh-css-p {font-style: italic;color: #66d9ef;}.elmsh-js-ce {font-style: italic;color: #a6e22e;}.elmsh-css-ar-i {font-weight: bold;color: #f92672;}""" ]
            |> Element.WithContext.html
        ]
        |> Element.WithContext.layout {}
            [ Element.WithContext.Background.color (Element.WithContext.rgb 0 0 0)
            , Element.WithContext.Font.color (Element.WithContext.rgb 1 1 1)
            , Element.WithContext.Font.size 22
            ]


type alias Context =
    {}


type ArticleContent
    = ArticleSequence { title : String, content : ArticleContent }
    | ArticleParagraph String
    | ArticleElmCode String
    | ArticleUnorderedList (List ArticleContent)
    | ArticleContentSequence (List ArticleContent)


whatToDoWithElmReviewErrorsArticle : ArticleContent
whatToDoWithElmReviewErrorsArticle =
    ArticleSequence
        { title = "(Barely anything) What to do with elm-review errors?"
        , content =
            ArticleContentSequence
                [ ArticleParagraph """Ever wanted to add helpers but introducing them at once would start a chain reaction?"""
                , ArticleParagraph """Especially when the new helper will make existing helpers irrelevant, it seems simplest to just get the refactor done with."""
                , ArticleParagraph """If you feel like this (like past and sometimes current lue), here's an alternative to try:"""
                , ArticleParagraph """Do a small, local, immediate step. Commit.
If you're happy, slowly follow `elm-review` and compiler errors and your project's refactoring todo list items one at a time."""
                , ArticleElmCode """
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
                , ArticleElmCode """
module Elm.Syntax.Expression.Extra exposing (getTuple2)
getTuple2 = ...
"""
                , ArticleParagraph """Oh no! The editor gives me squigglies, the CI is red, what to do?"""
                , ArticleParagraph """Most of these do not need to be fixed immediately!"""
                , ArticleParagraph """They are like leaving `Debug.todo` or failing test somewhere.
You know, the stuff that allows you to keep less things in your mind that "you still need to do"."""
                , ArticleParagraph """In that way, they are like an automated todo list for you and your whole team."""
                , ArticleParagraph """If you think there won't be an automated error for something on the way, make it a new item in a todo list.
Aggregating errors isn't scary. They have your back."""
                ]
        }


aSaferAstArticle : ArticleContent
aSaferAstArticle =
    ArticleSequence
        { title = "(Almost complete) A safer AST?"
        , content =
            ArticleContentSequence
                [ ArticleParagraph """Let's consider a really simple language"""
                , ArticleElmCode """
type Expression
  = String String
  | Int Int
  | Bool Bool
  | List (List Expression)
  | Equals { left : Expression, right : Expression }
"""
                , ArticleParagraph """This is "probably fine" TM but..."""
                , ArticleUnorderedList
                    [ ArticleContentSequence
                        [ ArticleParagraph """it allows users to generate incorrect expressions"""
                        , ArticleElmCode """
List [ String "My name is ", Int 5 ]
Equals { left = String "High" , right = Int 5 }
"""
                        ]
                    , ArticleParagraph """it has impossible variants you are forced to case on"""
                    ]
                , ArticleParagraph """How hard can it be to make this small language completely type-safe?"""
                , ArticleParagraph """Naively, we could represent each kind of list and equals by it's own variant"""
                , ArticleElmCode """
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
                , ArticleParagraph """The ?? just keep on expanding, let's say with"""
                , ArticleElmCode """
type EqualsExpression
  = ... | EqualsOfList EqualsExpressionOfList

type EqualsExpressionOfList
  = EqualsOfListOfString (EqualsOf (List String))
  | EqualsOfListOfInt (EqualsOf (List Int))
  | EqualsOfListOfBool (EqualsOf (List BoolExpression))
  | EqualsOfListOfList (EqualsOf (List ??))
"""
                , ArticleParagraph """We just run into the same problem recursively."""
                , ArticleParagraph """We can apply some smart-smart to solve this!"""
                , ArticleElmCode """
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
                , ArticleParagraph """which allows us to build lists like"""
                , ArticleElmCode """
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
                , ArticleParagraph """Somehow, this works."""
                , ArticleParagraph """All these recursive types follow the same shape shown below. Can we abstract this somehow in elm?"""
                , ArticleElmCode """
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
                , ArticleParagraph """The `outer` is what makes this tricky."""
                , ArticleParagraph """Having an AST without it we can't for example represent "list equals list", only "a list of equals":"""
                , ArticleElmCode """
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
                , ArticleParagraph """So this is not quite right."""
                , ArticleParagraph """We can at least keep the general idea so that all expression kinds are in one place:"""
                , ArticleElmCode """
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
                , ArticleParagraph """which actually looks pretty nice?"""
                , ArticleElmCode """
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
                , ArticleParagraph """Well, it doesn't compile because "recursive type aliases" but the fix is as simple as wrapping each alias as a `type`"""
                , ArticleElmCode """
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
                , ArticleParagraph """the result looks less nice but acceptable I guess"""
                , ArticleElmCode """
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
                , ArticleParagraph """Let's add triples to that language"""
                , ArticleElmCode """
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
                , ArticleParagraph """The pieces don't seem to fit."""
                , ArticleParagraph """Let's start again, with a simpler AST of only int, tuple and equals and a naive approach... Well, what would be a naive approach?"""
                , ArticleParagraph """For past lue, tuples and especially triples shattered the hope of being able to safely represent them like this in an ast.
So much so in fact that lue was slowly losing interest and abandoned this project after a while."""
                , ArticleParagraph """Much, much later... in fact only when writing this did I think of _two_-ish solutions that would have saved a good chunk of my sanity.
I know you're smarter than me, so if you have a free afternoon or whatever, maybe use this as a brain exercise?
Or just look at the solutions below."""
                , ArticleParagraph """First the -ish solution:"""
                , ArticleElmCode """
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
                , ArticleParagraph """Expressions written down look passable, even if just barely. Here for `( 0, 0 == 0 ) == ( 0, 0 == 0 )`"""
                , ArticleElmCode """
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
                , ArticleParagraph """The one unsatisfying parts"""
                , ArticleUnorderedList
                    [ ArticleContentSequence
                        [ ArticleParagraph """`ExtendFirstX (OfY xy)` and `ExtendedSecondY (OfX xy)` are equivalent if the `xy` isn't nested further (and so only flat tuples are compared)"""
                        , ArticleUnorderedList
                            [ ArticleParagraph """This, I'm sure can be ironed out on the type level [Citation needed]"""
                            ]
                        ]
                    , ArticleContentSequence
                        [ ArticleParagraph """I cannot, even now, think of a safe equivalent for triples"""
                        , ArticleUnorderedList
                            [ ArticleParagraph """If it exists, it probably also grows rapidly in variant count"""
                            , ArticleParagraph """If you think you found something, even if cursed, I beg you to drop me a line @lue on slack"""
                            ]
                        ]
                    ]
                , ArticleParagraph """Strangely, with the second solution everything becomes eerily simple:"""
                , ArticleElmCode """
type EqualsExpression
  = EqualsOfInt (EqualsOf Int)
  | EqualsOfExpression (EqualsOf EqualsExpression)
  | EqualsOfTuple { firsts : EqualsExpression, seconds : EqualsExpression }
  | EqualsOfTriple { firsts : EqualsExpression, seconds : EqualsExpression, thirds : EqualsExpression }
"""
                , ArticleParagraph """Wtf?"""
                ]
        }


articleContentUi : ArticleContent -> Element.WithContext.Element Context event_
articleContentUi =
    \articleContent ->
        case articleContent of
            ArticleSequence titled ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 25
                    , Element.WithContext.paddingXY 70 40
                    ]
                    [ titled.title
                        |> Element.WithContext.text
                        |> Element.WithContext.el [ Element.WithContext.Font.size 35 ]
                    , titled.content |> articleContentUi
                    ]

            ArticleParagraph text ->
                Element.WithContext.paragraph []
                    [ Element.WithContext.text text
                    ]

            ArticleElmCode rawSourceCodeString ->
                let
                    rawSourceCode : String
                    rawSourceCode =
                        rawSourceCodeString
                            |> String.lines
                            |> List.Extra.dropWhile String.isEmpty
                            |> List.Extra.dropWhileRight String.isEmpty
                            |> String.join "\n"
                in
                case rawSourceCode |> SyntaxHighlight.elm of
                    Ok highlightable ->
                        highlightable
                            |> SyntaxHighlight.toBlockHtml Nothing
                            |> Element.WithContext.html
                            |> Element.WithContext.el [ Element.WithContext.Font.size 18 ]

                    Err _ ->
                        Element.WithContext.text ("Couldn't parse code snippet. Here's the un-highlighted code: " ++ rawSourceCode)

            ArticleContentSequence contentList ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 22
                    ]
                    (contentList |> List.map articleContentUi)

            ArticleUnorderedList unorderedList ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 20
                    , Element.WithContext.paddingXY 20 14
                    ]
                    (unorderedList
                        |> List.map
                            (\item ->
                                Element.WithContext.row []
                                    [ Element.WithContext.text "-"
                                        |> Element.WithContext.el
                                            [ Element.WithContext.Font.size 30
                                            , Element.WithContext.alignTop
                                            , Element.WithContext.paddingXY 10 0
                                            ]
                                    , item
                                        |> articleContentUi
                                        |> Element.WithContext.el
                                            [ Element.WithContext.alignTop
                                            , Element.WithContext.width Element.WithContext.fill
                                            ]
                                    ]
                            )
                    )


audio : AudioData -> State -> Audio.Audio
audio _ =
    \state ->
        audioKinds
            |> List.map
                (\audioKind ->
                    audioWith (state.audio |> accessAudioOfKind audioKind)
                        (\loadedAudio ->
                            state.audioTimes
                                |> accessAudioOfKind audioKind
                                |> List.map
                                    (\time -> Audio.audio loadedAudio (Duration.addTo time (Duration.seconds 0.07)))
                                |> Audio.group
                        )
                )
            |> Audio.group


accessAudioOfKind : AudioKind -> EachAudio a -> a
accessAudioOfKind kind =
    case kind of
        AudioRoomChange ->
            .roomChange


audioWith : Result error_ value -> (value -> Audio.Audio) -> Audio.Audio
audioWith source with =
    case source of
        Err _ ->
            Audio.silence

        Ok loadedAudio ->
            with loadedAudio


type AudioKind
    = AudioRoomChange


type alias EachAudio perKind =
    { roomChange : perKind
    }


port audioPortToJS : Json.Encode.Value -> Cmd msg_


port audioPortFromJS : (Json.Decode.Value -> msg) -> Sub msg
