module RangeDict exposing (RangeDict, any, empty, foldl, get, insert, justValuesMap, mapFromList, member, remove, singleton, toListMap, union, unionFromListMap)

import Dict exposing (Dict)
import Elm.Syntax.Range


type RangeDict v
    = RangeDict (Dict ( ( Int, Int ), ( Int, Int ) ) v)


empty : RangeDict v
empty =
    RangeDict Dict.empty


singleton : Elm.Syntax.Range.Range -> v -> RangeDict v
singleton range value =
    RangeDict (Dict.singleton (rangeAsString range) value)


{-| Indirect conversion from a list to key-value pairs to avoid successive List.map calls.
-}
mapFromList : (a -> ( Elm.Syntax.Range.Range, v )) -> List a -> RangeDict v
mapFromList toAssociation list =
    List.foldl
        (\element acc ->
            let
                ( range, v ) =
                    toAssociation element
            in
            Dict.insert (rangeAsString range) v acc
        )
        Dict.empty
        list
        |> RangeDict


unionFromListMap : (element -> RangeDict value) -> List element -> RangeDict value
unionFromListMap elementToDict =
    \list ->
        list
            |> List.foldl
                (\el soFar -> union (el |> elementToDict) soFar)
                empty


insert : Elm.Syntax.Range.Range -> v -> RangeDict v -> RangeDict v
insert range value (RangeDict rangeDict) =
    RangeDict (Dict.insert (rangeAsString range) value rangeDict)


remove : Elm.Syntax.Range.Range -> RangeDict v -> RangeDict v
remove range (RangeDict rangeDict) =
    RangeDict (Dict.remove (rangeAsString range) rangeDict)


get : Elm.Syntax.Range.Range -> RangeDict v -> Maybe v
get range (RangeDict rangeDict) =
    Dict.get (rangeAsString range) rangeDict


member : Elm.Syntax.Range.Range -> RangeDict v -> Bool
member range (RangeDict rangeDict) =
    Dict.member (rangeAsString range) rangeDict


justValuesMap : (Elm.Syntax.Range.Range -> value -> Maybe valueMapped) -> RangeDict value -> RangeDict valueMapped
justValuesMap rangeAndValueMap =
    \rangeDict ->
        rangeDict
            |> foldl
                (\range value soFar ->
                    case rangeAndValueMap range value of
                        Nothing ->
                            soFar

                        Just valueMapped ->
                            soFar |> insert range valueMapped
                )
                empty


toListMap : (Elm.Syntax.Range.Range -> value -> element) -> RangeDict value -> List element
toListMap rangeAndValueToElement =
    \rangeDict ->
        rangeDict
            |> foldr
                (\range value soFar ->
                    soFar |> (::) (rangeAndValueToElement range value)
                )
                []


foldl : (Elm.Syntax.Range.Range -> v -> folded -> folded) -> folded -> RangeDict v -> folded
foldl reduce initialFolded (RangeDict rangeDict) =
    Dict.foldl (\range value -> reduce (rangeFromTupleTuple range) value) initialFolded rangeDict


foldr : (Elm.Syntax.Range.Range -> v -> folded -> folded) -> folded -> RangeDict v -> folded
foldr reduce initialFolded (RangeDict rangeDict) =
    Dict.foldr (\range value -> reduce (rangeFromTupleTuple range) value) initialFolded rangeDict


any : (v -> Bool) -> RangeDict v -> Bool
any isFound rangeDict =
    foldl (\_ value soFar -> soFar || isFound value)
        False
        rangeDict


union : RangeDict v -> RangeDict v -> RangeDict v
union (RangeDict aRangeDict) (RangeDict bRangeDict) =
    RangeDict (Dict.union aRangeDict bRangeDict)


rangeAsString : Elm.Syntax.Range.Range -> ( ( Int, Int ), ( Int, Int ) )
rangeAsString range =
    ( ( range.start.row, range.start.column )
    , ( range.end.row, range.end.column )
    )


rangeFromTupleTuple : ( ( Int, Int ), ( Int, Int ) ) -> Elm.Syntax.Range.Range
rangeFromTupleTuple =
    \( start, end ) ->
        { start = start |> locationFromTuple, end = end |> locationFromTuple }


locationFromTuple : ( Int, Int ) -> Elm.Syntax.Range.Location
locationFromTuple =
    \( row, column ) ->
        { row = row, column = column }
