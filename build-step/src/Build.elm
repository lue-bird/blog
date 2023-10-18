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
                  , url = section.title |> Articles.sectionTitleToUrl
                  , categories = []
                  , author = "lue"
                  , pubDate = Rss.DateTime section.publishTime
                  , content = Nothing
                  , contentEncoded =
                        Just (articleContent |> Articles.toHtmlStringifiable |> Html.String.toString 0)
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
