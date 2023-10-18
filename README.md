So far, I've shared ideas through elm packages.
But well... some ideas have not worked out, some were abandoned, some are about external tools.

So far you'll only find thoughts here that are in the process of being formalized.
Nothing is "published" anywhere so if you find this though github, enjoy what's already here
or wait another year until there _might_ be a running website with rss and whatnot.

### (very rough early stages) website

[website](https://lue-bird.github.io/blog/), built using [elm](https://elm-lang.org/).

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

#### TODOs
- custom elm code formatting (determine what's a type vs a variant)
    - potentially integrate elm-interpreter
- rss
- links for the titled sections
