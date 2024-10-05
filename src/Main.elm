port module Main exposing (main)

{-| -}

import Articles
import Browser
import Color exposing (Color)
import Element
import ElmSyntaxHighlight
import Html exposing (Html)
import Html.Attributes
import Html.Events
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
        , body = [ state |> ui ]
        }


ui : State -> Html Event
ui state =
    Element.column
        [ Element.centerX
        , Element.paddingXY 19 0
        ]
        [ Html.button
            [ domBackgroundColor (foregroundColor state.theme)
            , domFontColor (backgroundColor state.theme)
            , Html.Attributes.style "border-radius" "0px 0px 1000px 1000px"
            , Html.Attributes.style "padding" " 0px 30px 10px 30px"
            , Html.Attributes.style "text-align" "center"
            , Html.Attributes.style "vertical-align" "middle"
            , Html.Attributes.style "border" "none"
            , domFontSize 20
            , Html.Events.onClick
                (case state.theme of
                    WhiteTheme ->
                        ThemeSelected BlackTheme

                    BlackTheme ->
                        ThemeSelected WhiteTheme
                )
            ]
            [ -- 🌖︎ 🌓 🌒 🌑 ☾ ☾ ☽ 🕵 ✨ 💫 🌙 🌛
              -- ☀︎ ☀️ 💡
              Html.text "ᝰ"
            ]
            |> Element.html
        , Element.column
            [ Element.paddingXY 0 40
            , Element.width (Element.maximum 700 Element.fill)
            , Element.centerX
            ]
            [ Articles.all
                |> articleContentUi { theme = state.theme }
                |> Element.html
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
            [ domBackgroundColor (backgroundColor state.theme) |> Element.htmlAttribute
            , domFontColor (foregroundColor state.theme) |> Element.htmlAttribute
            , domFontSize 19
                |> Element.htmlAttribute
            , Html.Attributes.style "color-scheme"
                (case state.theme of
                    BlackTheme ->
                        "dark"

                    WhiteTheme ->
                        "light"
                )
                |> Element.htmlAttribute
            ]


backgroundColor : Theme -> Color.Color
backgroundColor theme =
    case theme of
        BlackTheme ->
            Color.rgb 0 0 0

        WhiteTheme ->
            Color.rgb 1 1 1


foregroundColor : Theme -> Color.Color
foregroundColor theme =
    case theme of
        BlackTheme ->
            Color.rgb 1 1 1

        WhiteTheme ->
            Color.rgb 0 0 0


articleContentUi : { theme : Theme } -> Articles.Content -> Html.Html event_
articleContentUi context =
    -- IGNORE TCO
    \articleContent ->
        case articleContent of
            Articles.Section section ->
                Html.div
                    [ Html.Attributes.style "padding" "40 0 55 0"
                    ]
                    [ Html.div []
                        [ linkUi context
                            { label =
                                [ section.title |> Html.text ]
                                    |> Html.p
                                        [ domFontSize 30
                                        , Html.Attributes.style "overflow-wrap" "break-word"
                                        , Html.Attributes.style "padding-top" "20px"
                                        , Html.Attributes.style "margin-bottom" "0px"
                                        , Html.Attributes.id (section.title |> Articles.sectionTitleToUrl)
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
                            |> Html.text
                            |> List.singleton
                            |> Html.p
                                [ domFontSize 14
                                , Html.Attributes.style "font-family" "monospace"
                                ]
                        ]
                    , Html.br [] []
                    , section.content |> articleContentUi context
                    ]

            Articles.Paragraph parts ->
                Html.p
                    [ Html.Attributes.style "overflow-wrap" "break-word"
                    , Html.Attributes.style "white-space" "normal"
                    , Html.Attributes.style "line-height" "1.25"
                    , Html.Attributes.style "margin-top" "0px"
                    , Html.Attributes.style "margin-bottom" "0px"
                    ]
                    (parts
                        |> List.map
                            (\part ->
                                part |> paragraphPartUi context
                            )
                    )

            Articles.ElmCode elmCode ->
                Html.pre
                    [ Html.Attributes.style "margin-top" "0px"
                    , Html.Attributes.style "margin-bottom" "0px"
                    , Html.Attributes.style "overflow" "scroll"
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
                        [ elmCode |> elmCodeUi context.theme [] ]
                    ]

            Articles.Sequence contentList ->
                Html.div
                    []
                    (contentList
                        |> List.map (\item -> item |> articleContentUi context)
                        |> List.intersperse (Html.br [] [])
                    )

            Articles.UnorderedList unorderedList ->
                Html.ul
                    [ Html.Attributes.style "padding" "14 0 14 20"
                    ]
                    (unorderedList
                        |> List.map
                            (\item ->
                                Html.li []
                                    [ item
                                        |> articleContentUi context
                                    ]
                            )
                        |> List.intersperse (Html.br [] [])
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


paragraphPartUi : { theme : Theme } -> Articles.ParagraphPart -> Html.Html event_
paragraphPartUi context =
    \paragraphPart ->
        case paragraphPart of
            Articles.Text string ->
                Html.text string

            Articles.Italic string ->
                Html.em [] [ Html.text string ]

            Articles.InlineElmCode elmCode ->
                elmCode
                    |> elmCodeUi context.theme
                        [ Html.Attributes.style "font-size" "0.9em"
                        ]

            Articles.Link link ->
                linkUi context
                    { url = link.url
                    , label = Html.text link.description
                    }


domBackgroundColor : Color -> Html.Attribute event_
domBackgroundColor color =
    Html.Attributes.style "background-color" (color |> Color.toCssString)


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


linkUi : { theme : Theme } -> { url : String, label : Html.Html event } -> Html.Html event
linkUi context config =
    Html.a
        [ Html.Attributes.href config.url
        , Html.Attributes.style "border-bottom" "1px"
        , Html.Attributes.style "border-color" (interactiveColor context.theme |> Color.toCssString)
        , domFontColor (interactiveColor context.theme)
        ]
        [ config.label ]


elmCodeUi : Theme -> List (Html.Attribute event) -> (ElmSyntaxHighlight.SyntaxHighlightable -> Html event)
elmCodeUi theme additionalDomModifiers =
    \syntaxHighlightable ->
        Html.code []
            (syntaxHighlightable
                |> List.map
                    (\segment ->
                        Html.code
                            (case segment.syntaxKind of
                                Nothing ->
                                    additionalDomModifiers

                                Just syntaxKind ->
                                    Html.Attributes.style "color"
                                        (syntaxKind |> syntaxKindToColor theme |> Color.toCssString)
                                        :: additionalDomModifiers
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


domFontColor : Color -> Html.Attribute event_
domFontColor color =
    Html.Attributes.style "color" (color |> Color.toCssString)


domFontSize : Int -> Html.Attribute event_
domFontSize heightInPixels =
    -- TODO switch to rem?
    Html.Attributes.style "font-size" ((heightInPixels |> String.fromInt) ++ "px")


port toJS : Json.Encode.Value -> Cmd msg_


port fromJS : (Json.Decode.Value -> msg) -> Sub msg
