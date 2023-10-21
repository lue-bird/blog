module Build exposing (program)

{-| Usage see readme.

using the wonderful <https://dark.elm.dmy.fr/packages/albertdahlin/elm-posix/latest/>

-}

import Articles
import Dict exposing (Dict)
import Html.String
import Html.String.Attributes
import List.Extra
import Posix.IO
import Posix.IO.File
import Posix.IO.Process
import Rss
import String.Extra
import Time


program : Posix.IO.Process -> Posix.IO.IO ()
program process =
    case process.argv |> parseArguments of
        Just arguments ->
            Posix.IO.File.writeContentsTo "../feed.xml"
                (rssGenerate { currentTime = arguments.currentTime })

        Nothing ->
            Posix.IO.File.write Posix.IO.File.stdErr
                ("invalid arguments: " ++ (process.argv |> String.join " ") ++ "\n")
                |> Posix.IO.andThen
                    (\() ->
                        Posix.IO.Process.exit -1
                    )


parseArguments : List String -> Maybe { currentTime : Time.Posix }
parseArguments =
    \arguments ->
        case arguments of
            _ :: buildTimeString :: [] ->
                case buildTimeString |> String.toInt of
                    Just buildTimeInSeconds ->
                        Just { currentTime = buildTimeInSeconds * 1000 |> Time.millisToPosix }

                    Nothing ->
                        Nothing

            _ ->
                Nothing


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
articlesParagraphPartToStringifiable =
    \paragraphPart ->
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
