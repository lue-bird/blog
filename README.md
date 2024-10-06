So far, I've shared ideas through elm packages.
But well... some ideas have not worked out, some were abandoned, some are about external tools.

→ [website](https://lue-bird.github.io/blog/)

#### run locally

```shell
npm install && \
npx vite
```
then open http://localhost:5173/


For all future runs, you just need
```shell
npx vite
```

Links to the tools:
  - [elm-state-interface](https://dark.elm.dmy.fr/packages/lue-bird/elm-state-interface/latest/)
  - [vite](https://vitejs.dev/)
  - [ryan-haskell/vite-plugin-elm-watch](https://github.com/ryan-haskell/vite-plugin-elm-watch)
  - [lydell/elm-watch](https://lydell.github.io/elm-watch/)

### contributing
Before building the new version, `cd build-step` and run
```bash
elm-cli run src/Build.elm $EPOCHSECONDS
```
to generate the new rss feed.
