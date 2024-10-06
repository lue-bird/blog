import * as Web from "@lue-bird/elm-state-interface-experimental"
import Main from "./Main.elm"

const elmApp = Main.init()
Web.programStart({ ports: elmApp.ports, domElement: document.querySelector("main") })