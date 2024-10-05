port module Main exposing (main)

{-| -}

import Articles
import Browser
import Color exposing (Color)
import Element
import Element.Background
import Element.Font
import Element.Input
import ElmSyntaxHighlight
import Html exposing (Html)
import Html.Attributes
import Json.Decode
import Json.Encode
import RecordWithoutConstructorFunction exposing (RecordWithoutConstructorFunction)
import Time


type alias State =
    RecordWithoutConstructorFunction
        { theme : Theme
        }


type Event
    = ThemeSelected Theme


type Theme
    = WhiteTheme
    | BlackTheme


main : Program () State Event
main =
    Browser.document
        { init =
            \() -> ( initialState, Cmd.none )
        , update =
            \event state ->
                ( reactTo event state, Cmd.none )
        , subscriptions =
            \_ -> Sub.none
        , view =
            \state -> state |> uiDocument
        }


initialState : State
initialState =
    { theme = BlackTheme
    }


reactTo : Event -> (State -> State)
reactTo event =
    case event of
        ThemeSelected newTheme ->
            \state ->
                { state | theme = newTheme }


uiDocument : State -> Browser.Document Event
uiDocument =
    \state ->
        { title = "lue blog"
        , body =
            state |> ui |> List.singleton
        }


ui : State -> Html Event
ui state =
    Element.column
        [ Element.centerX
        , Element.paddingXY 19 0
        ]
        [ Element.Input.button
            [ Element.Background.color (foregroundColor state.theme)
            , Element.Font.color (backgroundColor state.theme)
            , Html.Attributes.style "border-radius" "0px 0px 1000px 1000px" |> Element.htmlAttribute
            , Element.paddingEach { left = 30, right = 30, bottom = 10, top = 10 }
            , Element.alignLeft
            ]
            (case state.theme of
                WhiteTheme ->
                    { label = "ᝰ" |> Element.text -- 🌖︎ 🌓 🌒 🌑 ☾ ☾ ☽ 🕵 ✨ 💫 🌙 🌛
                    , onPress = ThemeSelected BlackTheme |> Just
                    }

                BlackTheme ->
                    { label = "ᝰ" |> Element.text -- ☀︎ ☀️ 💡
                    , onPress = ThemeSelected WhiteTheme |> Just
                    }
            )
        , Element.column
            [ Element.paddingXY 0 40
            , Element.width (Element.maximum 700 Element.fill)
            , Element.centerX
            ]
            [ Articles.all |> articleContentUi { theme = state.theme }
            ]
        ]
        |> Element.layoutWith
            { options =
                [ Element.focusStyle
                    { shadow = Nothing
                    , borderColor = Nothing
                    , backgroundColor = Nothing
                    }
                ]
            }
            [ Element.Background.color (backgroundColor state.theme)
            , Element.Font.color (foregroundColor state.theme)
            , Element.Font.size 19
            , Html.Attributes.style "color-scheme"
                (case state.theme of
                    BlackTheme ->
                        "dark"

                    WhiteTheme ->
                        "light"
                )
                |> Element.htmlAttribute
            ]


backgroundColor : Theme -> Element.Color
backgroundColor theme =
    case theme of
        BlackTheme ->
            Element.rgb 0 0 0

        WhiteTheme ->
            Element.rgb 1 1 1


foregroundColor : Theme -> Element.Color
foregroundColor theme =
    case theme of
        BlackTheme ->
            Element.rgb 1 1 1

        WhiteTheme ->
            Element.rgb 0 0 0


articleContentUi : { theme : Theme } -> Articles.Content -> Element.Element event_
articleContentUi context =
    -- IGNORE TCO
    \articleContent ->
        case articleContent of
            Articles.Section section ->
                Element.column
                    [ Element.spacing 39
                    , Element.width Element.fill
                    , Element.paddingEach { left = 0, top = 40, bottom = 55, right = 0 }
                    ]
                    [ Element.column [ Element.spacing 7 ]
                        [ linkUi context
                            { label =
                                [ section.title |> Element.text |> Element.el [] ]
                                    |> Element.paragraph
                                        [ Element.Font.size 30
                                        , Html.Attributes.style "overflow-wrap" "break-word"
                                            |> Element.htmlAttribute
                                        , Html.Attributes.id (section.title |> Articles.sectionTitleToUrl)
                                            |> Element.htmlAttribute
                                        ]
                            , url = "#" ++ Articles.sectionTitleToUrl section.title
                            }
                        , (case section.completion of
                            Articles.Published publishTime ->
                                [ "🌐 published y"
                                , publishTime |> Time.toYear Time.utc |> String.fromInt
                                , " m"
                                , publishTime |> Time.toMonth Time.utc |> monthToInt |> String.fromInt
                                , " d"
                                , publishTime |> Time.toDay Time.utc |> String.fromInt
                                ]
                                    |> String.concat

                            Articles.InProgress progress ->
                                "! 🛠️ in progress: " ++ progress
                          )
                            |> Element.text
                            |> List.singleton
                            |> Element.paragraph
                                [ Element.Font.size 14
                                , Element.Font.family [ Element.Font.monospace ]
                                ]
                        ]
                    , section.content |> articleContentUi context
                    ]

            Articles.Paragraph parts ->
                Element.paragraph
                    [ Html.Attributes.style "overflow-wrap" "break-word"
                        |> Element.htmlAttribute
                    , Element.width Element.fill
                    ]
                    (parts |> List.map (\part -> part |> paragraphPartUi context))

            Articles.ElmCode elmCode ->
                Html.pre
                    [ Html.Attributes.style "overflow" "scroll"
                    , Html.Attributes.style "overflow-y" "hidden"
                    , Html.Attributes.style "scrollbar-color"
                        ([ interactiveColor context.theme |> Color.toCssString
                         , " "
                         , Color.rgba 0 0 0 0 |> Color.toCssString
                         ]
                            |> String.concat
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
                    |> Element.html

            Articles.Sequence contentList ->
                Element.column
                    [ Element.spacing 22
                    , Element.width Element.fill
                    ]
                    (contentList |> List.map (\item -> item |> articleContentUi context))

            Articles.UnorderedList unorderedList ->
                Element.column
                    [ Element.spacing 20
                    , Element.paddingEach { left = 20, top = 14, bottom = 14, right = 0 }
                    , Element.width Element.fill
                    ]
                    (unorderedList
                        |> List.map
                            (\item ->
                                Element.row [ Element.width Element.fill ]
                                    [ Element.text "•"
                                        |> Element.el
                                            [ Element.Font.size 22
                                            , Element.alignTop
                                            , Element.paddingEach { left = 0, top = 0, bottom = 0, right = 10 }
                                            ]
                                    , item
                                        |> articleContentUi context
                                        |> Element.el
                                            [ Element.alignTop
                                            , Element.width Element.fill
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


paragraphPartUi : { theme : Theme } -> Articles.ParagraphPart -> Element.Element event_
paragraphPartUi context =
    \paragraphPart ->
        case paragraphPart of
            Articles.Text string ->
                Element.text string

            Articles.Italic string ->
                Element.text string
                    |> Element.el [ Element.Font.italic ]

            Articles.InlineElmCode elmCode ->
                elmCode
                    |> elmCodeUi context.theme
                    |> Element.html
                    |> Element.el
                        [ Html.Attributes.style "font-size" "0.9em"
                            |> Element.htmlAttribute
                        ]

            Articles.Link link ->
                linkUi context
                    { url = link.url
                    , label = Element.text link.description
                    }


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


interactiveColor : Theme -> Color.Color
interactiveColor theme =
    -- Element.rgb 1 0.5 0
    case theme of
        BlackTheme ->
            interactiveColorForBlackTheme

        WhiteTheme ->
            interactiveColorForBlackTheme |> blackThemeColorToWhiteTheme


interactiveColorForBlackTheme : Color
interactiveColorForBlackTheme =
    Color.rgb 0.49 0.83 1


linkUi : { theme : Theme } -> { url : String, label : Element.Element event } -> Element.Element event
linkUi context config =
    Element.link
        [ Html.Attributes.style "border-bottom" "1px"
            |> Element.htmlAttribute
        , Html.Attributes.style "border-color" (interactiveColor context.theme |> Color.toCssString)
            |> Element.htmlAttribute
        , Element.Font.color
            (interactiveColor context.theme
                |> Color.toRgba
                |> Element.fromRgb
            )
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


port toJS : Json.Encode.Value -> Cmd msg_


port fromJS : (Json.Decode.Value -> msg) -> Sub msg
