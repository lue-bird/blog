port module Main exposing (main)

{-| -}

import Articles
import Audio exposing (AudioData)
import Browser
import Browser.Dom
import Browser.Events
import Duration
import Element.WithContext
import Element.WithContext.Background
import Element.WithContext.Border
import Element.WithContext.Font
import Html exposing (Html)
import Html.String
import Json.Decode
import Json.Encode
import Key
import List.Extra
import Random
import Reaction exposing (Reaction)
import RecordWithoutConstructorFunction exposing (RecordWithoutConstructorFunction)
import String.Extra
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
            Time.millisToPosix 0
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
        [ topBarUi
        , Articles.all |> articleContentUi
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


topBarUi : Element.WithContext.Element Context event_
topBarUi =
    Element.WithContext.wrappedRow
        [ Element.WithContext.paddingXY 70 0, Element.WithContext.spacing 16 ]
        [ rssUi
        , linkUi
            { label = "source code on github" |> Element.WithContext.text
            , url = "https://github.com/lue-bird/blog"
            }
        ]


rssUi : Element.WithContext.Element Context event_
rssUi =
    linkUi
        { label = "subscribe via rss" |> Element.WithContext.text
        , url = "https://lue-bird.github.io/blog/feed.xml"
        }


interactiveColor : Element.WithContext.Color
interactiveColor =
    Element.WithContext.rgb 1 0.5 0


linkUi : { url : String, label : Element.WithContext.Element context msg } -> Element.WithContext.Element context msg
linkUi config =
    Element.WithContext.link
        [ Element.WithContext.Border.widthEach { left = 0, right = 0, top = 0, bottom = 3 }
        , Element.WithContext.Border.color interactiveColor
        ]
        config


articleContentUi : Articles.Content -> Element.WithContext.Element Context event_
articleContentUi =
    \articleContent ->
        case articleContent of
            Articles.Section titled ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 25
                    , Element.WithContext.paddingXY 70 40
                    ]
                    [ titled.title
                        |> Element.WithContext.text
                        |> Element.WithContext.el [ Element.WithContext.Font.size 35 ]
                    , titled.content |> articleContentUi
                    ]

            Articles.Paragraph text ->
                Element.WithContext.paragraph []
                    [ Element.WithContext.text text ]

            Articles.ElmCode rawSourceCodeString ->
                let
                    rawSourceCode : String
                    rawSourceCode =
                        rawSourceCodeString
                            |> String.lines
                            |> List.Extra.dropWhile String.Extra.isBlank
                            |> List.Extra.dropWhileRight String.Extra.isBlank
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

            Articles.Sequence contentList ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 22
                    ]
                    (contentList |> List.map articleContentUi)

            Articles.UnorderedList unorderedList ->
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
