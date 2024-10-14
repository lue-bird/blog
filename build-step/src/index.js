import * as Node from "@lue-bird/elm-state-interface-experimental/node"

const elmApp = Node.compileElm(import.meta.dirname, "Build.elm").init()
Node.programStart({ ports: elmApp.ports })