module Build exposing (program)

{-| Usage see readme.

using the wonderful <https://dark.elm.dmy.fr/packages/albertdahlin/elm-posix/latest/>

-}

import Articles
import Posix.IO
import Posix.IO.File
import Rss
import Time
import Html.String
import Html.String
import Html.String.Attributes
import List.Extra
import String.Extra


program : Posix.IO.Process -> Posix.IO.IO ()
program process =
    case parseArguments process.argv of
        Just arguments ->
            Posix.IO.File.writeContentsTo "../feed.xml"
                (rssGenerate { currentTime = arguments.currentTime })

        Nothing ->
            Posix.IO.File.write Posix.IO.File.stdErr
                ("invalid arguments: " ++ String.join " " process.argv)


parseArguments : List String -> Maybe { currentTime : Time.Posix }
parseArguments =
    \argumentStrings ->
        case argumentStrings of
            _ :: buildTimeString :: [] ->
                case String.toInt buildTimeString of
                    Just buildTimeInSeconds ->
                        Just { currentTime = buildTimeInSeconds * 1000 |> Time.millisToPosix }

                    Nothing ->
                        Nothing

            _ ->
                Nothing


rssGenerate : { currentTime : Time.Posix } -> String
rssGenerate { currentTime } =
    Rss.generate
        { title = "lue blog"
        , description = "lue's thoughts"
        , url = "https://lue-bird.github.io/blog/"
        , lastBuildTime = currentTime
        , generator = Just "dillonkearns/elm-rss"
        , items = Articles.all |> articleSectionsToRssItems
        , siteUrl = "https://lue-bird.github.io/blog/"
        }


articleSectionsToRssItems : Articles.Content -> List Rss.Item
articleSectionsToRssItems =
    \articleContent ->
        case articleContent of
            Articles.Section section ->
                [ { title = section.title
                  , description = section.description
                  , url = "#" ++ section.title |> Articles.sectionTitleToUrl
                  , categories = []
                  , author = "lue"
                  , pubDate = Rss.DateTime section.publishTime
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
articlesContentToHtmlStringifiable =
    \articleContent ->
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

            Articles.ElmCode rawSourceCodeString ->
                Html.String.pre []
                    [ Html.String.code []
                        [ Html.String.text
                            (rawSourceCodeString
                                |> String.lines
                                |> List.Extra.dropWhile String.Extra.isBlank
                                |> List.Extra.dropWhileRight String.Extra.isBlank
                                |> String.join "\n"
                            )
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
articlesParagraphPartToStringifiable =
    \paragraphPart ->
        case paragraphPart of
            Articles.Text string ->
                Html.String.text string

            Articles.Italic string ->
                Html.String.i [] [ Html.String.text string ]

            Articles.InlineCode raw ->
                Html.String.code [] [ Html.String.text raw ]

            Articles.Link link ->
                Html.String.a [ Html.String.Attributes.href link.url ]
                    [ Html.String.text link.description ]
