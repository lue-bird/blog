port module Main exposing (State, Theme(..), main)

{-| 
-}

import Articles
import Color exposing (Color)
import ElmSyntaxHighlight
import Json.Decode
import Json.Encode
import RecordWithoutConstructorFunction exposing (RecordWithoutConstructorFunction)
import Time
import Web


type alias State =
    RecordWithoutConstructorFunction
        { theme : Theme
        }


type Event
    = ThemeSelected Theme


type Theme
    = WhiteTheme
    | BlackTheme


main : Web.Program State
main =
    Web.program
        { initialState = initialState
        , interface =
            \state ->
                state
                    |> ui
                    |> Web.domRender
                    |> Web.interfaceFutureMap (\event -> reactTo event state)
        , ports = { toJs = toJs, fromJs = fromJs }
        }


initialState : State
initialState =
    { theme = BlackTheme
    }


reactTo : Event -> State -> State
reactTo event =
    case event of
        ThemeSelected newTheme ->
            \state ->
                { state | theme = newTheme }


ui : State -> Web.DomNode Event
ui state =
    domDiv
        [ domBackgroundColor (backgroundColor state.theme)
        , domFontColor (foregroundColor state.theme)
        , Web.domStyle "color-scheme"
            (case state.theme of
                BlackTheme ->
                    "dark"

                WhiteTheme ->
                    "light"
            )
        , Web.domStyle "top" "0"
        , Web.domStyle "right" "0"
        , Web.domStyle "bottom" "0"
        , Web.domStyle "left" "0"
        ]
        [ domDiv
            [ Web.domStyle "padding-left" "19px"
            , Web.domStyle "padding-right" "19px"
            , Web.domStyle "max-width" "700px"
            , Web.domStyle "margin" "auto"
            , Web.domStyle "overflow" "hidden"
            ]
            [ domButton
                [ domBackgroundColor (foregroundColor state.theme)
                , domFontColor (backgroundColor state.theme)
                , Web.domStyle "border-radius" "0px 0px 1000px 1000px"
                , Web.domStyle "padding" " 0px 30px 10px 30px"
                , Web.domStyle "text-align" "center"
                , Web.domStyle "vertical-align" "middle"
                , Web.domStyle "border" "none"
                , Web.domStyle "font-size" "20px"
                , Web.domListenTo "pointerdown"
                    |> Web.domModifierFutureMap
                        (\_ ->
                            case state.theme of
                                WhiteTheme ->
                                    ThemeSelected BlackTheme

                                BlackTheme ->
                                    ThemeSelected WhiteTheme
                        )
                ]
                [ -- 🌖︎ 🌓 🌒 🌑 ☾ ☾ ☽ 🕵 ✨ 💫 🌙 🌛
                  -- ☀︎ ☀️ 💡
                  Web.domText "ᝰ"
                ]
            , domDiv
                [ Web.domStyle "padding-top" "40px"
                ]
                [ Articles.all
                    |> articleContentUi { theme = state.theme }
                ]
            ]
        ]


domButton : List (Web.DomModifier future) -> List (Web.DomNode future) -> Web.DomNode future
domButton modifiers subs =
    Web.domElement "button" modifiers subs


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


articleContentUi : { theme : Theme } -> Articles.Content -> Web.DomNode event_
articleContentUi context articleContent =
    -- IGNORE TCO
    case articleContent of
        Articles.Section section ->
            domDiv
                [ Web.domStyle "padding" "40 0 55 0"
                ]
                [ domDiv []
                    [ linkUi context
                        { label =
                            domH1
                                [ Web.domStyle "overflow-wrap" "break-word"
                                , Web.domStyle "padding-top" "20px"
                                , Web.domStyle "margin-bottom" "0px"
                                , Web.domAttribute "id" (section.title |> Articles.sectionTitleToUrl)
                                ]
                                [ section.title |> Web.domText ]
                        , url = "#" ++ Articles.sectionTitleToUrl section.title
                        }
                    , (case section.completion of
                        Articles.Published publishTime ->
                            [ """🌐 published y"""
                            , publishTime |> Time.toYear Time.utc |> String.fromInt
                            , " m"
                            , publishTime |> Time.toMonth Time.utc |> monthToInt |> String.fromInt
                            , " d"
                            , publishTime |> Time.toDay Time.utc |> String.fromInt
                            ]
                                |> String.concat

                        Articles.InProgress progress ->
                            """! 🛠️ in progress: """ ++ progress
                      )
                        |> Web.domText
                        |> List.singleton
                        |> domP
                            [ domFontSizePercentage 0.85
                            , Web.domStyle "font-family" "monospace"
                            ]
                    ]
                , domBr [] []
                , section.content |> articleContentUi context
                ]

        Articles.Paragraph parts ->
            domP
                [ Web.domStyle "overflow-wrap" "break-word"
                , Web.domStyle "white-space" "normal"
                , Web.domStyle "line-height" "1.25"
                , Web.domStyle "margin-top" "0px"
                , Web.domStyle "margin-bottom" "0px"
                ]
                (parts
                    |> List.map
                        (\part ->
                            part |> paragraphPartUi context
                        )
                )

        Articles.ElmCode elmCode ->
            domPre
                [ Web.domStyle "margin-top" "0px"
                , Web.domStyle "margin-bottom" "0px"
                , Web.domStyle "overflow" "auto"
                , Web.domStyle "overflow-y" "hidden"
                , Web.domStyle "scrollbar-color"
                    ([ interactiveColor context.theme |> Color.toCssString
                     , " "
                     , Color.rgba 0 0 0 0 |> Color.toCssString
                     ]
                        |> String.concat
                    )
                , Web.domStyle "scrollbar-width" "thin"
                , Web.domStyle "white-space" "pre-line"
                , Web.domStyle "width" "fit-content"
                , Web.domStyle "max-width" "100%"
                , Web.domStyle "min-width" "100%"
                , Web.domStyle "width" "0px"
                ]
                [ Web.domElement "code"
                    [ Web.domStyle "white-space" "pre"
                    , Web.domStyle "word-spacing" "normal"
                    , Web.domStyle "word-break" "normal"
                    , Web.domStyle "overflow-wrap" "normal"
                    , Web.domStyle "hyphens" "none"
                    , Web.domStyle "font-size" "1rem"
                    ]
                    [ elmCode |> elmCodeUi context.theme [] ]
                ]

        Articles.Sequence contentList ->
            domDiv
                []
                (contentList
                    |> List.map (\item -> item |> articleContentUi context)
                    |> List.intersperse (domBr [] [])
                )

        Articles.UnorderedList unorderedList ->
            Web.domElement "ul"
                [ Web.domStyle "padding" "14 0 14 20"
                ]
                (unorderedList
                    |> List.map
                        (\item ->
                            Web.domElement "li"
                                []
                                [ item |> articleContentUi context
                                ]
                        )
                    |> List.intersperse (domBr [] [])
                )


domH1 : List (Web.DomModifier future) -> List (Web.DomNode future) -> Web.DomNode future
domH1 modifiers subs =
    Web.domElement "h1" modifiers subs


domP : List (Web.DomModifier future) -> List (Web.DomNode future) -> Web.DomNode future
domP modifiers subs =
    Web.domElement "p" modifiers subs


domPre : List (Web.DomModifier future) -> List (Web.DomNode future) -> Web.DomNode future
domPre modifiers subs =
    Web.domElement "pre" modifiers subs


domBr : List (Web.DomModifier future) -> List (Web.DomNode future) -> Web.DomNode future
domBr modifiers subs =
    Web.domElement "br" modifiers subs


monthToInt : Time.Month -> Int
monthToInt month =
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


paragraphPartUi : { theme : Theme } -> Articles.ParagraphPart -> Web.DomNode event_
paragraphPartUi context paragraphPart =
    case paragraphPart of
        Articles.Text string ->
            Web.domText string

        Articles.Italic string ->
            Web.domElement "em" [] [ Web.domText string ]

        Articles.InlineElmCode elmCode ->
            elmCode
                |> elmCodeUi context.theme
                    [ Web.domStyle "font-size" "1rem"
                    ]

        Articles.Link link ->
            linkUi context
                { url = link.url
                , label = Web.domText link.description
                }


domFontSizePercentage : Float -> Web.DomModifier event_
domFontSizePercentage heightInRem =
    Web.domStyle "font-size" ((heightInRem |> String.fromFloat) ++ "rem")


domBackgroundColor : Color -> Web.DomModifier event_
domBackgroundColor color =
    Web.domStyle "background-color" (color |> Color.toCssString)


domDiv : List (Web.DomModifier future) -> List (Web.DomNode future) -> Web.DomNode future
domDiv modifiers subs =
    Web.domElement "div" modifiers subs


blackThemeColorToWhiteTheme : Color -> Color
blackThemeColorToWhiteTheme color =
    color
        |> -- hsl lightness does not match perceived lightness so this is an approximation at best
           -- I'd love to find a package with LHC or something similar
           Color.toHsla
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


linkUi : { theme : Theme } -> { url : String, label : Web.DomNode event } -> Web.DomNode event
linkUi context config =
    Web.domElement "a"
        [ Web.domAttribute "href" config.url
        , Web.domStyle "border-bottom" "1px"
        , Web.domStyle "border-color" (interactiveColor context.theme |> Color.toCssString)
        , domFontColor (interactiveColor context.theme)
        ]
        [ config.label ]


elmCodeUi : Theme -> List (Web.DomModifier event) -> ElmSyntaxHighlight.SyntaxHighlightable -> Web.DomNode event
elmCodeUi theme additionalDomModifiers syntaxHighlightable =
    Web.domElement "code"
        []
        (syntaxHighlightable
            |> List.map
                (\segment ->
                    Web.domElement "code"
                        (case segment.syntaxKind of
                            Nothing ->
                                additionalDomModifiers

                            Just syntaxKind ->
                                Web.domStyle "color"
                                    (syntaxKind |> syntaxKindToColor theme |> Color.toCssString)
                                    :: additionalDomModifiers
                        )
                        [ Web.domText segment.string
                        ]
                )
        )


syntaxKindToColor : Theme -> ElmSyntaxHighlight.SyntaxKind -> Color
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


domFontColor : Color -> Web.DomModifier event_
domFontColor color =
    Web.domStyle "color" (color |> Color.toCssString)


port toJs : Json.Encode.Value -> Cmd msg_


port fromJs : (Json.Decode.Value -> msg) -> Sub msg
