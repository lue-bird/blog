## What to do with elm-review errors?

Ever wanted to add helpers but introducing them at once would start a chain reaction?

Especially when the new helper will make existing helpers irrelevant, it seems simplest to just get the refactor done with.

If you feel like this (like past and sometimes current lue), here's an alternative to try:

Do a small, local, immediate step. Commit.
If you're happy, slowly follow `elm-review` and compiler errors and your project's refactoring todo list items one at a time.

```elm        
listUnzipCheck =
    case lastArgument partitionCall of
        Just listArgument ->
            let error = ...
            in
            case listArgument of
                Expression.Tuple2Literal tuple2 ->
                    Just error
                
                nonTuple2Literal ->
                    nonTuple2Literal
                        |> Elm.Syntax.Expression.Extra.parseSpecificFnCall "Tuple.pair"
                        |> Maybe.map (\_ -> error)
        
        Just ()

listPartitionCheck partitionCall =
    case fullyAppliedLastArg partitionCall.arguments of
        TODO
```

```elm
module Elm.Syntax.Expression.Extra exposing (getTuple2)
getTuple2 = ...
```

Oh no! The editor gives me squigglies, the CI is red, what to do?

Most of these do not need to be fixed immediately!

They are like leaving `Debug.todo` or failing test somewhere.
You know, the stuff that allows you to keep less things in your mind that "you still need to do".

In that way, they are like an automated todo list for you and your whole team.

If you think there won't be an automated error for something on the way, make it a new item in a todo list.
Aggregating errors isn't scary. They have your back.
