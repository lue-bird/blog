So far, I've shared ideas through elm packages.
But well... some ideas have not worked out, some were abandoned, some are about external tools.

→ [(early stages) website](https://lue-bird.github.io/blog/), built using [elm](https://elm-lang.org/).

#### run locally
```noformatingples
npx elm-watch hot
```
  - [lydell/elm-watch website](https://lydell.github.io/elm-watch/)

and open the index.html file or better
```noformatingples
serve
```
  - [vercel/serve](https://github.com/vercel/serve)


### contributing
Before building the new version, `cd build-step` and run
```bash
elm-cli run src/Build.elm $EPOCHSECONDS
```
to generate the new rss feed.
