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
import ElmCodeUi
import Html exposing (Html)
import Html.Attributes
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
        , Element.WithContext.paddingXY 19 40
        , Element.WithContext.width (Element.WithContext.maximum 750 Element.WithContext.fill)
        , Element.WithContext.centerX
        ]
        [ Articles.all
            |> articleContentUi
        ]
        |> Element.WithContext.layout {}
            [ Element.WithContext.Background.color (Element.WithContext.rgb 0 0 0)
            , Element.WithContext.Font.color (Element.WithContext.rgb 1 1 1)
            , Element.WithContext.Font.size 20
            ]


linkUi : { url : String, label : Element.WithContext.Element context msg } -> Element.WithContext.Element context msg
linkUi config =
    Element.WithContext.link
        [ Element.WithContext.Border.widthEach { left = 0, right = 0, top = 0, bottom = 3 }
        , Element.WithContext.Border.color interactiveColor
        ]
        config


interactiveColor : Element.WithContext.Color
interactiveColor =
    Element.WithContext.rgb 1 0.5 0


articleContentUi : Articles.Content -> Element.WithContext.Element Context event_
articleContentUi =
    \articleContent ->
        case articleContent of
            Articles.Section section ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 25
                    , Element.WithContext.paddingEach { left = 35, top = 40, bottom = 40, right = 0 }
                    ]
                    [ linkUi
                        { label =
                            [ section.title
                                |> Element.WithContext.text
                            ]
                                |> Element.WithContext.paragraph
                                    [ Element.WithContext.Font.size 30
                                    , Html.Attributes.style "overflow-wrap" "break-word"
                                        |> Element.WithContext.htmlAttribute
                                    , Html.Attributes.id (section.title |> Articles.sectionTitleToUrl)
                                        |> Element.WithContext.htmlAttribute
                                    ]
                        , url = "#" ++ Articles.sectionTitleToUrl section.title
                        }
                    , section.content |> articleContentUi
                    ]

            Articles.Paragraph parts ->
                Element.WithContext.paragraph
                    [ Html.Attributes.style "overflow-wrap" "break-word"
                        |> Element.WithContext.htmlAttribute
                    ]
                    (parts |> List.map paragraphPartUi)

            Articles.ElmCode elmCode ->
                Html.pre
                    [ Html.Attributes.style "overflow" "scroll"
                    , Html.Attributes.style "white-space" "pre-line"
                    , Html.Attributes.style "width" "fit-content"
                    , Html.Attributes.style "min-width" "100%"
                    , Html.Attributes.style "width" "0px"
                    ]
                    [ Html.code
                        [ Html.Attributes.style "white-space" "pre"
                        , Html.Attributes.style "word-spacing" "normal"
                        , Html.Attributes.style "word-break" "normal"
                        , Html.Attributes.style "overflow-wrap" "normal"
                        , Html.Attributes.style "hyphens" "none"
                        , Html.Attributes.style "font-size" "0.7em"
                        ]
                        [ ElmCodeUi.with elmCode.syntaxKindMap elmCode.raw ]
                    ]
                    |> Element.WithContext.html

            Articles.Sequence contentList ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 22
                    ]
                    (contentList |> List.map articleContentUi)

            Articles.UnorderedList unorderedList ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 20
                    , Element.WithContext.paddingEach { left = 20, top = 14, bottom = 14, right = 0 }
                    ]
                    (unorderedList
                        |> List.map
                            (\item ->
                                Element.WithContext.row []
                                    [ Element.WithContext.text "-"
                                        |> Element.WithContext.el
                                            [ Element.WithContext.Font.size 30
                                            , Element.WithContext.alignTop
                                            , Element.WithContext.paddingEach { left = 0, top = 0, bottom = 0, right = 10 }
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


paragraphPartUi : Articles.ParagraphPart -> Element.WithContext.Element Context event_
paragraphPartUi =
    \paragraphPart ->
        case paragraphPart of
            Articles.Text string ->
                Element.WithContext.text string

            Articles.Italic string ->
                Element.WithContext.text string
                    |> Element.WithContext.el [ Element.WithContext.Font.italic ]

            Articles.InlineElmCode elmCode ->
                ElmCodeUi.with elmCode.syntaxKindMap elmCode.raw
                    |> Element.WithContext.html

            Articles.Link link ->
                linkUi
                    { url = link.url
                    , label = Element.WithContext.text link.description
                    }


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


type alias Context =
    {}


type AudioKind
    = AudioRoomChange


type alias EachAudio perKind =
    { roomChange : perKind
    }


port audioPortToJS : Json.Encode.Value -> Cmd msg_


port audioPortFromJS : (Json.Decode.Value -> msg) -> Sub msg
