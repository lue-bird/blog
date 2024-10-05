module Reaction exposing
    ( Reaction
    , to
    , effectsAdd
    , toTuple3
    , EffectInterpretation
    , commands, audioCommands
    )

{-|

@docs Reaction


## create

@docs to


## alter

@docs effectsAdd


## transform

@docs toTuple3


### effect interpretation

@docs EffectInterpretation
@docs commands, audioCommands

-}

import Audio


{-| application update result
-}
type alias Reaction state effect =
    { state : state
    , effects : List effect
    }


{-| The updated state
-}
state : Reaction state effect_ -> state
state =
    .state


{-| All effects caused
-}
effects : Reaction state_ effect -> List effect
effects =
    .effects


to : state -> Reaction state effect_
to stateAltered =
    { state = stateAltered
    , effects = []
    }


effectsAdd :
    List effect
    -> (Reaction state effect -> Reaction state effect)
effectsAdd effectsAdditional =
    \reaction ->
        { state = reaction |> state
        , effects =
            (reaction |> effects) ++ effectsAdditional
        }


{-| Last step before giving your init/update functions to the audio app:
3-tuple from state, effects as first `Cmd`s, then `AudioCmd`s
-}
toTuple3 :
    (effect -> EffectInterpretation event)
    ->
        (Reaction state effect
         ->
            ( state
            , Cmd event
            , Audio.AudioCmd event
            )
        )
toTuple3 interpretEffect =
    \step ->
        let
            commandsList : List (EffectInterpretation event)
            commandsList =
                step |> effects |> List.map interpretEffect
        in
        ( step |> state
        , commandsList |> List.concatMap .commands |> Cmd.batch
        , commandsList |> List.concatMap .audioCommands |> Audio.cmdBatch
        )


{-| Interpretation of an effect as `Cmd`s and `AudioCmd`s.
-}
type alias EffectInterpretation event =
    { commands : List (Cmd event)
    , audioCommands : List (Audio.AudioCmd event)
    }


commands : List (Cmd event) -> EffectInterpretation event
commands commandList =
    { commands = commandList, audioCommands = [] }


audioCommands : List (Audio.AudioCmd event) -> EffectInterpretation event
audioCommands audioCommandList =
    { commands = [], audioCommands = audioCommandList }
