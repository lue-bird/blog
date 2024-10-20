import * as Node from "@lue-bird/elm-state-interface-experimental/node"
import { Elm } from "./elmBuild.js"

const elmApp = Elm.Build.init()
Node.programStart({ ports: elmApp.ports })