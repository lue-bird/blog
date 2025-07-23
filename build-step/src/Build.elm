port module Build exposing (main)

{-| Usage see readme.
-}

import Articles
import Bytes.Encode
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
    = Running
        { runDirectory : Maybe String
        , currentTime : Maybe Time.Posix
        }
    | FailedToWrite String


main : Node.Program State
main =
    Node.program
        { initialState =
            Running { runDirectory = Nothing, currentTime = Nothing }
        , interface =
            \state ->
                case state of
                    FailedToWrite errorMessage ->
                        Node.standardErrWrite ("failed: " ++ errorMessage ++ "\n")

                    Running running ->
                        [ case ( running.runDirectory, running.currentTime ) of
                            ( Just runDirectory, Just currentTime ) ->
                                Node.fileWrite
                                    { path = runDirectory ++ "/../dist/feed.xml"
                                    , content =
                                        rssGenerate { currentTime = currentTime }
                                            |> Bytes.Encode.string
                                            |> Bytes.Encode.encode
                                    }
                                    |> Node.interfaceFutureMap
                                        (\result ->
                                            case result of
                                                Ok () ->
                                                    Running running

                                                Err error ->
                                                    FailedToWrite error.message
                                        )

                            _ ->
                                Node.interfaceNone
                        , case running.runDirectory of
                            Just _ ->
                                Node.interfaceNone

                            Nothing ->
                                Node.workingDirectoryPathRequest
                                    |> Node.interfaceFutureMap
                                        (\runDirectory ->
                                            Running { runDirectory = Just runDirectory, currentTime = running.currentTime }
                                        )
                        , case running.currentTime of
                            Just _ ->
                                Node.interfaceNone

                            Nothing ->
                                Node.timePosixRequest
                                    |> Node.interfaceFutureMap
                                        (\currentTime ->
                                            Running { currentTime = Just currentTime, runDirectory = running.runDirectory }
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
