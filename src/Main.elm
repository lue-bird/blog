port module Main exposing (main)

{-| -}

import Articles
import Audio
import Browser
import Browser.Dom
import Browser.Events
import Color exposing (Color)
import Duration
import Element.WithContext
import Element.WithContext.Background
import Element.WithContext.Border
import Element.WithContext.Font
import Element.WithContext.Input
import ElmSyntaxHighlight
import Html exposing (Html)
import Html.Attributes
import Json.Decode
import Json.Encode
import Key
import Random
import Reaction exposing (Reaction)
import RecordWithoutConstructorFunction exposing (RecordWithoutConstructorFunction)
import Task
import Time


type Event
    = AudioLoaded { piece : AudioKind, result : Result Audio.LoadError Audio.Source }
    | GameWindowSized { width : Float, height : Float }
    | InitialRandomSeedReceived Random.Seed
    | FrameTickPassed Time.Posix
    | KeyPressed Key.Key
    | KeyReleased Key.Key
    | ThemeSelected Theme


type alias State =
    RecordWithoutConstructorFunction
        { audio : EachAudio (Result Audio.LoadError Audio.Source)
        , theme : Theme
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
        , theme = BlackTheme
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

        ThemeSelected newTheme ->
            \state ->
                Reaction.to
                    { state | theme = newTheme }

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
ui state =
    Element.WithContext.column
        [ Element.WithContext.centerX
        , Element.WithContext.paddingXY 19 0
        ]
        [ Element.WithContext.withContext
            (\context ->
                Element.WithContext.Input.button
                    [ Element.WithContext.Background.color (foregroundColor context.theme)
                    , Element.WithContext.Font.color (backgroundColor context.theme)
                    , Element.WithContext.Border.roundEach { topLeft = 0, topRight = 0, bottomLeft = 1000, bottomRight = 1000 }
                    , Element.WithContext.paddingEach { left = 30, right = 30, bottom = 10, top = 10 }
                    , Element.WithContext.alignLeft
                    ]
                    (case context.theme of
                        WhiteTheme ->
                            { label = "ᝰ" |> Element.WithContext.text -- 🌖︎ 🌓 🌒 🌑 ☾ ☾ ☽ 🕵 ✨ 💫 🌙 🌛
                            , onPress = ThemeSelected BlackTheme |> Just
                            }

                        BlackTheme ->
                            { label = "ᝰ" |> Element.WithContext.text -- ☀︎ ☀️ 💡
                            , onPress = ThemeSelected WhiteTheme |> Just
                            }
                    )
            )
        , Element.WithContext.column
            [ Element.WithContext.paddingXY 0 40
            , Element.WithContext.width (Element.WithContext.maximum 700 Element.WithContext.fill)
            , Element.WithContext.centerX
            ]
            [ Articles.all |> articleContentUi
            ]
        ]
        |> Element.WithContext.layoutWith { theme = state.theme }
            { options =
                [ Element.WithContext.focusStyle
                    { shadow = Nothing
                    , borderColor = Nothing
                    , backgroundColor = Nothing
                    }
                ]
            }
            [ Element.WithContext.withContextAttribute
                (\context -> Element.WithContext.Background.color (backgroundColor context.theme))
            , Element.WithContext.withContextAttribute
                (\context -> Element.WithContext.Font.color (foregroundColor context.theme))
            , Element.WithContext.Font.size 19
            , Element.WithContext.withContextAttribute
                (\context ->
                    Html.Attributes.style "color-scheme"
                        (case context.theme of
                            BlackTheme ->
                                "dark"

                            WhiteTheme ->
                                "light"
                        )
                        |> Element.WithContext.htmlAttribute
                )
            ]


backgroundColor : Theme -> Element.WithContext.Color
backgroundColor theme =
    case theme of
        BlackTheme ->
            Element.WithContext.rgb 0 0 0

        WhiteTheme ->
            Element.WithContext.rgb 1 1 1


foregroundColor : Theme -> Element.WithContext.Color
foregroundColor theme =
    case theme of
        BlackTheme ->
            Element.WithContext.rgb 1 1 1

        WhiteTheme ->
            Element.WithContext.rgb 0 0 0


blackThemeColorToWhiteTheme : Color -> Color
blackThemeColorToWhiteTheme =
    \color ->
        color
            -- hsl lightness does not match perceived lightness so this is an approximation at best
            -- I'd love to find a package with LHC or something similar
            |> Color.toHsla
            |> (\hsla ->
                    { hsla | lightness = 0.18, saturation = 1 }
               )
            |> Color.fromHsla


interactiveColor : Theme -> Element.WithContext.Color
interactiveColor theme =
    -- Element.WithContext.rgb 1 0.5 0
    (case theme of
        BlackTheme ->
            interactiveColorForBlackTheme

        WhiteTheme ->
            interactiveColorForBlackTheme |> blackThemeColorToWhiteTheme
    )
        |> Color.toRgba
        |> Element.WithContext.fromRgb


interactiveColorForBlackTheme : Color
interactiveColorForBlackTheme =
    Color.rgb 0.49 0.83 1


linkUi : { url : String, label : Element.WithContext.Element Context event } -> Element.WithContext.Element Context event
linkUi config =
    Element.WithContext.link
        [ Element.WithContext.Border.widthEach { left = 0, right = 0, top = 0, bottom = 1 }
        , Element.WithContext.withContextAttribute
            (\context -> Element.WithContext.Border.color (interactiveColor context.theme))
        , Element.WithContext.withContextAttribute
            (\context -> Element.WithContext.Font.color (interactiveColor context.theme))
        ]
        config


elmCodeUi : Theme -> (ElmSyntaxHighlight.SyntaxHighlightable -> Html event_)
elmCodeUi theme =
    \syntaxHighlightable ->
        Html.code []
            (syntaxHighlightable
                |> List.map
                    (\segment ->
                        Html.code
                            (case segment.syntaxKind of
                                Nothing ->
                                    []

                                Just syntaxKind ->
                                    [ Html.Attributes.style "color"
                                        (syntaxKind |> syntaxKindToColor theme |> Color.toCssString)
                                    ]
                            )
                            [ Html.text segment.string
                            ]
                    )
            )


syntaxKindToColor : Theme -> (ElmSyntaxHighlight.SyntaxKind -> Color)
syntaxKindToColor theme =
    case theme of
        BlackTheme ->
            syntaxKindToColorForBlackTheme

        WhiteTheme ->
            \syntaxKind ->
                syntaxKindToColorForBlackTheme syntaxKind |> blackThemeColorToWhiteTheme


syntaxKindToColorForBlackTheme : ElmSyntaxHighlight.SyntaxKind -> Color
syntaxKindToColorForBlackTheme =
    -- light purple Color.rgb 0.97 0.42 1
    \syntaxKind ->
        case syntaxKind of
            ElmSyntaxHighlight.Type ->
                Color.rgb 0.9 0.55 1

            ElmSyntaxHighlight.Variant ->
                Color.rgb 0.24 0.75 0.62

            ElmSyntaxHighlight.Field ->
                Color.rgb 0.4 0.9 0

            ElmSyntaxHighlight.ModuleNameOrAlias ->
                Color.rgb 0.45 0.5 1

            ElmSyntaxHighlight.Variable ->
                Color.rgb 0.85 0.8 0.1

            ElmSyntaxHighlight.Flow ->
                Color.rgb 1 0.45 0.35

            ElmSyntaxHighlight.DeclarationRelated ->
                Color.rgb 0.55 0.75 1


articleContentUi : Articles.Content -> Element.WithContext.Element Context event_
articleContentUi =
    \articleContent ->
        case articleContent of
            Articles.Section section ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 39
                    , Element.WithContext.width Element.WithContext.fill
                    , Element.WithContext.paddingEach { left = 0, top = 40, bottom = 55, right = 0 }
                    ]
                    [ Element.WithContext.column [ Element.WithContext.spacing 7 ]
                        [ linkUi
                            { label =
                                [ section.title |> Element.WithContext.text |> Element.WithContext.el [] ]
                                    |> Element.WithContext.paragraph
                                        [ Element.WithContext.Font.size 30
                                        , Html.Attributes.style "overflow-wrap" "break-word"
                                            |> Element.WithContext.htmlAttribute
                                        , Html.Attributes.id (section.title |> Articles.sectionTitleToUrl)
                                            |> Element.WithContext.htmlAttribute
                                        ]
                            , url = "#" ++ Articles.sectionTitleToUrl section.title
                            }
                        , (case section.completion of
                            Articles.Published publishTime ->
                                "🌐 published y"
                                    ++ (publishTime |> Time.toYear Time.utc |> String.fromInt)
                                    ++ " m"
                                    ++ (publishTime |> Time.toMonth Time.utc |> monthToInt |> String.fromInt)
                                    ++ " d"
                                    ++ (publishTime |> Time.toDay Time.utc |> String.fromInt)

                            Articles.InProgress progress ->
                                "! 🛠️ in progress: " ++ progress
                          )
                            |> Element.WithContext.text
                            |> List.singleton
                            |> Element.WithContext.paragraph
                                [ Element.WithContext.Font.size 14
                                , Element.WithContext.Font.family [ Element.WithContext.Font.monospace ]
                                ]
                        ]
                    , section.content |> articleContentUi
                    ]

            Articles.Paragraph parts ->
                Element.WithContext.paragraph
                    [ Html.Attributes.style "overflow-wrap" "break-word"
                        |> Element.WithContext.htmlAttribute
                    , Element.WithContext.width Element.WithContext.fill
                    ]
                    (parts |> List.map paragraphPartUi)

            Articles.ElmCode elmCode ->
                Element.WithContext.withContext
                    (\context ->
                        Html.pre
                            [ Html.Attributes.style "overflow" "scroll"
                            , Html.Attributes.style "overflow-y" "hidden"
                            , Html.Attributes.style "scrollbar-color"
                                ((interactiveColor context.theme |> Element.WithContext.toRgb |> Color.fromRgba |> Color.toCssString)
                                    ++ " "
                                    ++ (Color.rgba 0 0 0 0 |> Color.toCssString)
                                )
                            , Html.Attributes.style "scrollbar-width" "thin"
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
                                , Html.Attributes.style "font-size" "0.8em"
                                ]
                                [ elmCode |> elmCodeUi context.theme ]
                            ]
                            |> Element.WithContext.html
                    )

            Articles.Sequence contentList ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 22
                    , Element.WithContext.width Element.WithContext.fill
                    ]
                    (contentList |> List.map articleContentUi)

            Articles.UnorderedList unorderedList ->
                Element.WithContext.column
                    [ Element.WithContext.spacing 20
                    , Element.WithContext.paddingEach { left = 20, top = 14, bottom = 14, right = 0 }
                    , Element.WithContext.width Element.WithContext.fill
                    ]
                    (unorderedList
                        |> List.map
                            (\item ->
                                Element.WithContext.row [ Element.WithContext.width Element.WithContext.fill ]
                                    [ Element.WithContext.text "•"
                                        |> Element.WithContext.el
                                            [ Element.WithContext.Font.size 22
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


monthToInt : Time.Month -> Int
monthToInt =
    \month ->
        case month of
            Time.Jan ->
                1

            Time.Feb ->
                2

            Time.Mar ->
                3

            Time.Apr ->
                4

            Time.May ->
                5

            Time.Jun ->
                6

            Time.Jul ->
                7

            Time.Aug ->
                8

            Time.Sep ->
                9

            Time.Oct ->
                10

            Time.Nov ->
                11

            Time.Dec ->
                12


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
                Element.WithContext.withContext
                    (\context ->
                        elmCode
                            |> elmCodeUi context.theme
                            |> Element.WithContext.html
                            |> Element.WithContext.el
                                [ Html.Attributes.style "font-size" "0.9em"
                                    |> Element.WithContext.htmlAttribute
                                ]
                    )

            Articles.Link link ->
                linkUi
                    { url = link.url
                    , label = Element.WithContext.text link.description
                    }


audio : Audio.AudioData -> State -> Audio.Audio
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
    { theme : Theme }


type Theme
    = WhiteTheme
    | BlackTheme


type AudioKind
    = AudioRoomChange


type alias EachAudio perKind =
    { roomChange : perKind
    }


port audioPortToJS : Json.Encode.Value -> Cmd msg_


port audioPortFromJS : (Json.Decode.Value -> msg) -> Sub msg
