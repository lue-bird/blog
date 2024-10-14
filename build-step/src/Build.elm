port module Build exposing (main)

{-| Usage see readme.
-}

import Articles
import Dict exposing (Dict)
import Html.String
import Html.String.Attributes
import Json.Encode
import List.Extra
import Node
import Rss
import String.Extra
import Time


type State
    = State
        { runDirectory : Maybe String
        , currentTime : Maybe Time.Posix
        }


main : Node.Program State
main =
    Node.program
        { initialState = State { runDirectory = Nothing, currentTime = Nothing }
        , interface =
            \(State state) ->
                case ( state.runDirectory, state.currentTime ) of
                    ( Just runDirectory, Just currentTime ) ->
                        Node.fileUtf8Write
                            { path = runDirectory ++ "/feed.xml"
                            , content = rssGenerate { currentTime = currentTime }
                            }

                    ( maybeRunDirectory, maybeCurrentTime ) ->
                        [ case maybeRunDirectory of
                            Just _ ->
                                Node.interfaceNone

                            Nothing ->
                                Node.workingDirectoryPathRequest
                                    |> Node.interfaceFutureMap
                                        (\runDirectory ->
                                            State { runDirectory = Just runDirectory, currentTime = maybeCurrentTime }
                                        )
                        , case maybeCurrentTime of
                            Just _ ->
                                Node.interfaceNone

                            Nothing ->
                                Node.timePosixRequest
                                    |> Node.interfaceFutureMap
                                        (\currentTime ->
                                            State { currentTime = Just currentTime, runDirectory = maybeRunDirectory }
                                        )
                        ]
                            |> Node.interfaceBatch
        , ports = { toJs = toJs, fromJs = fromJs }
        }


rssGenerate : { currentTime : Time.Posix } -> String
rssGenerate buildData =
    Rss.generate
        { title = "lue blog"
        , description = "lue's thoughts"
        , url = "https://lue-bird.github.io/blog/"
        , lastBuildTime = buildData.currentTime
        , generator = Just "dillonkearns/elm-rss"
        , items = Articles.all |> articleSectionsToRssItems
        , siteUrl = "https://lue-bird.github.io/blog/"
        }
        |> String.replace "&lt;![CDATA[" ""
        |> String.replace "]]&gt;" ""


articleSectionsToRssItems : Articles.Content -> List Rss.Item
articleSectionsToRssItems articleContent =
    case articleContent of
        Articles.Section section ->
            case section.completion of
                Articles.InProgress _ ->
                    []

                Articles.Published publishTime ->
                    [ { title = section.title
                      , description = section.description
                      , url = "#" ++ section.title |> Articles.sectionTitleToUrl
                      , categories = []
                      , author = "lue"
                      , pubDate = Rss.DateTime publishTime
                      , content = Nothing
                      , contentEncoded =
                            Just (articleContent |> articlesContentToHtmlStringifiable |> Html.String.toString 0)
                      , enclosure = Nothing
                      }
                    ]

        Articles.Paragraph _ ->
            []

        Articles.ElmCode _ ->
            []

        Articles.UnorderedList _ ->
            []

        Articles.Sequence sequence ->
            sequence |> List.concatMap articleSectionsToRssItems


articlesContentToHtmlStringifiable : Articles.Content -> Html.String.Html event_
articlesContentToHtmlStringifiable articleContent =
    case articleContent of
        Articles.Section section ->
            Html.String.section []
                [ [ Html.String.text section.title ]
                    |> Html.String.h3 []
                , section.content |> articlesContentToHtmlStringifiable
                ]

        Articles.Paragraph parts ->
            Html.String.p []
                (parts |> List.map articlesParagraphPartToStringifiable)

        Articles.ElmCode syntaxHighlightable ->
            Html.String.pre []
                [ Html.String.code []
                    [ Html.String.text
                        (syntaxHighlightable |> List.map .string |> String.concat)
                    ]
                ]

        Articles.Sequence contentList ->
            Html.String.div []
                (contentList |> List.map articlesContentToHtmlStringifiable)

        Articles.UnorderedList unorderedList ->
            Html.String.ul []
                (unorderedList
                    |> List.map
                        (\item ->
                            Html.String.li []
                                [ item |> articlesContentToHtmlStringifiable ]
                        )
                )


articlesParagraphPartToStringifiable : Articles.ParagraphPart -> Html.String.Html event_
articlesParagraphPartToStringifiable paragraphPart =
    case paragraphPart of
        Articles.Text string ->
            Html.String.text string

        Articles.Italic string ->
            Html.String.i [] [ Html.String.text string ]

        Articles.InlineElmCode syntaxHighlightable ->
            Html.String.code []
                [ Html.String.text (syntaxHighlightable |> List.map .string |> String.concat) ]

        Articles.Link link ->
            Html.String.a [ Html.String.Attributes.href link.url ]
                [ Html.String.text link.description ]


port toJs : Json.Encode.Value -> Cmd event_


port fromJs : (Json.Encode.Value -> event) -> Sub event
