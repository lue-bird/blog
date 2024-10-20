module ElmSyntaxHighlight exposing (SyntaxHighlightable, SyntaxKind(..), for)

import Elm.Parser
import Elm.Syntax.Comments
import Elm.Syntax.Declaration
import Elm.Syntax.Exposing
import Elm.Syntax.Expression
import Elm.Syntax.Import
import Elm.Syntax.Module
import Elm.Syntax.ModuleName
import Elm.Syntax.Node
import Elm.Syntax.Pattern
import Elm.Syntax.Range
import Elm.Syntax.Signature
import Elm.Syntax.TypeAnnotation
import List.Extra
import RangeDict exposing (RangeDict)


type SyntaxKind
    = Type
    | Variant
    | Field
    | ModuleNameOrAlias
    | Variable
    | Flow
    | DeclarationRelated


type alias SyntaxHighlightable =
    List { string : String, syntaxKind : Maybe SyntaxKind }


locationAddColumn : Int -> Elm.Syntax.Range.Location -> Elm.Syntax.Range.Location
locationAddColumn columnPlus =
    \location ->
        { location | column = location.column + columnPlus }


qualifiedSyntaxKindMap : SyntaxKind -> Elm.Syntax.Node.Node ( Elm.Syntax.ModuleName.ModuleName, String ) -> RangeDict SyntaxKind
qualifiedSyntaxKindMap kind =
    \(Elm.Syntax.Node.Node qualifiedRange ( qualification, name )) ->
        case qualification of
            [] ->
                RangeDict.singleton qualifiedRange kind

            _ :: _ ->
                RangeDict.empty
                    |> RangeDict.insert
                        { start = qualifiedRange.start
                        , end = qualifiedRange.end |> locationAddColumn -(name |> String.length)
                        }
                        ModuleNameOrAlias
                    |> RangeDict.insert
                        { start = qualifiedRange.end |> locationAddColumn -(name |> String.length)
                        , end = qualifiedRange.end
                        }
                        kind


patternSyntaxKindMap : Elm.Syntax.Node.Node Elm.Syntax.Pattern.Pattern -> RangeDict SyntaxKind
patternSyntaxKindMap =
    \(Elm.Syntax.Node.Node patternRange pattern) ->
        case pattern of
            Elm.Syntax.Pattern.AllPattern ->
                RangeDict.singleton patternRange Variable

            Elm.Syntax.Pattern.VarPattern _ ->
                RangeDict.singleton patternRange Variable

            Elm.Syntax.Pattern.UnitPattern ->
                RangeDict.singleton patternRange Variant

            Elm.Syntax.Pattern.CharPattern _ ->
                RangeDict.singleton patternRange Variant

            Elm.Syntax.Pattern.StringPattern _ ->
                RangeDict.singleton patternRange Variant

            Elm.Syntax.Pattern.IntPattern _ ->
                RangeDict.singleton patternRange Variant

            Elm.Syntax.Pattern.HexPattern _ ->
                RangeDict.singleton patternRange Variant

            Elm.Syntax.Pattern.FloatPattern _ ->
                RangeDict.singleton patternRange Variant

            Elm.Syntax.Pattern.TuplePattern parts ->
                parts |> RangeDict.unionFromListMap patternSyntaxKindMap

            Elm.Syntax.Pattern.RecordPattern fieldVariables ->
                fieldVariables |> RangeDict.mapFromList (\(Elm.Syntax.Node.Node variableRange _) -> ( variableRange, Variable ))

            Elm.Syntax.Pattern.UnConsPattern head tail ->
                RangeDict.union (head |> patternSyntaxKindMap) (tail |> patternSyntaxKindMap)

            Elm.Syntax.Pattern.ListPattern elements ->
                elements |> RangeDict.unionFromListMap patternSyntaxKindMap

            Elm.Syntax.Pattern.NamedPattern qualifiedRecord arguments ->
                let
                    qualified : ( Elm.Syntax.ModuleName.ModuleName, String )
                    qualified =
                        ( qualifiedRecord.moduleName, qualifiedRecord.name )
                in
                RangeDict.union
                    (Elm.Syntax.Node.Node
                        { start = patternRange.start
                        , end = patternRange.start |> locationAddColumn (qualified |> qualifiedRangeLength)
                        }
                        qualified
                        |> qualifiedSyntaxKindMap Variant
                    )
                    (arguments
                        |> RangeDict.unionFromListMap patternSyntaxKindMap
                    )

            Elm.Syntax.Pattern.AsPattern inner (Elm.Syntax.Node.Node variableRange _) ->
                inner
                    |> patternSyntaxKindMap
                    |> RangeDict.insert variableRange Variable

            Elm.Syntax.Pattern.ParenthesizedPattern inner ->
                inner |> patternSyntaxKindMap


qualifiedRangeLength : ( Elm.Syntax.ModuleName.ModuleName, String ) -> Int
qualifiedRangeLength =
    \( moduleName, name ) ->
        case moduleName of
            [] ->
                name |> String.length

            moduleNamePart0 :: moduleNamePart1Up ->
                List.foldl (\part soFar -> soFar + (part |> String.length))
                    ((moduleNamePart0 |> String.length) + 1 + (name |> String.length))
                    moduleNamePart1Up


expressionSyntaxKindMap :
    { rawSourceCode : List String, commentRanges : List Elm.Syntax.Range.Range }
    -> (Elm.Syntax.Node.Node Elm.Syntax.Expression.Expression -> RangeDict SyntaxKind)
expressionSyntaxKindMap context =
    let
        step : Elm.Syntax.Node.Node Elm.Syntax.Expression.Expression -> RangeDict SyntaxKind
        step =
            \sub -> sub |> expressionSyntaxKindMap context
    in
    \(Elm.Syntax.Node.Node expressionRange expression) ->
        case expression of
            Elm.Syntax.Expression.UnitExpr ->
                RangeDict.singleton expressionRange Variant

            Elm.Syntax.Expression.Application applicationParts ->
                applicationParts |> RangeDict.unionFromListMap step

            Elm.Syntax.Expression.OperatorApplication operatorSymbol _ left right ->
                RangeDict.union (left |> step) (right |> step)
                    |> (let
                            operatorRange : () -> Elm.Syntax.Range.Range
                            operatorRange () =
                                operatorSymbol
                                    |> tokenFindRangeIn
                                        { start = left |> Elm.Syntax.Node.range |> .end
                                        , end = right |> Elm.Syntax.Node.range |> .start
                                        }
                                        context
                                    -- if there is a bug
                                    |> Maybe.withDefault Elm.Syntax.Range.empty
                        in
                        case operatorSymbol of
                            "|>" ->
                                RangeDict.insert (operatorRange ()) Flow

                            "<|" ->
                                RangeDict.insert (operatorRange ()) Flow

                            _ ->
                                identity
                       )

            Elm.Syntax.Expression.FunctionOrValue moduleName name ->
                Elm.Syntax.Node.Node expressionRange ( moduleName, name )
                    |> qualifiedSyntaxKindMap
                        (if nameIsUppercase name then
                            Variant

                         else
                            Variable
                        )

            Elm.Syntax.Expression.IfBlock condition onTrue onFalse ->
                [ condition, onTrue, onFalse ]
                    |> RangeDict.unionFromListMap step
                    |> RangeDict.insert
                        { start = expressionRange.start
                        , end = { row = expressionRange.start.row, column = expressionRange.start.column + 2 }
                        }
                        Flow
                    |> RangeDict.insert
                        ("then"
                            |> tokenFindRangeIn
                                { start = condition |> Elm.Syntax.Node.range |> .end
                                , end = onTrue |> Elm.Syntax.Node.range |> .start
                                }
                                context
                            -- if there is a bug
                            |> Maybe.withDefault Elm.Syntax.Range.empty
                        )
                        Flow
                    |> RangeDict.insert
                        ("else"
                            |> tokenFindRangeIn
                                { start = onTrue |> Elm.Syntax.Node.range |> .end
                                , end = onFalse |> Elm.Syntax.Node.range |> .start
                                }
                                context
                            -- if there is a bug
                            |> Maybe.withDefault Elm.Syntax.Range.empty
                        )
                        Flow

            Elm.Syntax.Expression.PrefixOperator _ ->
                RangeDict.singleton expressionRange Variable

            Elm.Syntax.Expression.Operator _ ->
                RangeDict.empty

            Elm.Syntax.Expression.Integer _ ->
                RangeDict.singleton expressionRange Variant

            Elm.Syntax.Expression.Hex _ ->
                RangeDict.singleton expressionRange Variant

            Elm.Syntax.Expression.Floatable _ ->
                RangeDict.singleton expressionRange Variant

            Elm.Syntax.Expression.Negation inner ->
                inner |> step

            Elm.Syntax.Expression.Literal _ ->
                RangeDict.singleton expressionRange Variant

            Elm.Syntax.Expression.CharLiteral _ ->
                RangeDict.singleton expressionRange Variant

            Elm.Syntax.Expression.TupledExpression parts ->
                parts |> RangeDict.unionFromListMap step

            Elm.Syntax.Expression.ParenthesizedExpression inner ->
                inner |> step

            Elm.Syntax.Expression.LetExpression letIn ->
                RangeDict.union
                    (letIn.declarations
                        |> RangeDict.unionFromListMap (letDeclarationSyntaxKindMap context)
                    )
                    (letIn.expression |> step)
                    |> RangeDict.insert
                        { start = expressionRange.start
                        , end = { row = expressionRange.start.row, column = expressionRange.start.column + 3 }
                        }
                        DeclarationRelated
                    |> (case letIn.declarations |> List.Extra.last of
                            Nothing ->
                                identity

                            Just (Elm.Syntax.Node.Node lastDeclarationRange _) ->
                                RangeDict.insert
                                    ("in"
                                        |> tokenFindRangeIn
                                            { start = lastDeclarationRange.end
                                            , end = letIn.expression |> Elm.Syntax.Node.range |> .start
                                            }
                                            context
                                        -- if there is a bug
                                        |> Maybe.withDefault Elm.Syntax.Range.empty
                                    )
                                    DeclarationRelated
                       )

            Elm.Syntax.Expression.CaseExpression caseOf ->
                RangeDict.union
                    (caseOf.expression |> step)
                    (caseOf.cases
                        |> RangeDict.unionFromListMap
                            (\( casePattern, caseExpression ) ->
                                let
                                    (Elm.Syntax.Node.Node lastPatternRange _) =
                                        casePattern
                                in
                                RangeDict.union
                                    (casePattern |> patternSyntaxKindMap)
                                    (caseExpression |> step)
                                    |> RangeDict.insert
                                        { start = { column = lastPatternRange.end.column + 1, row = lastPatternRange.end.row }
                                        , end = { column = lastPatternRange.end.column + 3, row = lastPatternRange.end.row }
                                        }
                                        Flow
                            )
                    )
                    |> RangeDict.insert
                        { start = expressionRange.start
                        , end = { row = expressionRange.start.row, column = expressionRange.start.column + 4 }
                        }
                        Flow
                    |> (case caseOf.cases of
                            [] ->
                                identity

                            ( Elm.Syntax.Node.Node firstCasePatternRange _, _ ) :: _ ->
                                RangeDict.insert
                                    ("of"
                                        |> tokenFindRangeIn
                                            { start = caseOf.expression |> Elm.Syntax.Node.range |> .end
                                            , end = firstCasePatternRange.start
                                            }
                                            context
                                        -- if there is a bug
                                        |> Maybe.withDefault Elm.Syntax.Range.empty
                                    )
                                    Flow
                       )

            Elm.Syntax.Expression.LambdaExpression lambda ->
                RangeDict.union
                    (lambda.args |> RangeDict.unionFromListMap patternSyntaxKindMap)
                    (lambda.expression |> step)
                    |> RangeDict.insert
                        { start = expressionRange.start
                        , end = { row = expressionRange.start.row, column = expressionRange.start.column + 1 }
                        }
                        Flow
                    |> (case lambda.args |> List.Extra.last of
                            Just (Elm.Syntax.Node.Node lastPatternRange _) ->
                                RangeDict.insert
                                    { start = { column = lastPatternRange.end.column + 1, row = lastPatternRange.end.row }
                                    , end = { column = lastPatternRange.end.column + 3, row = lastPatternRange.end.row }
                                    }
                                    Flow

                            Nothing ->
                                identity
                       )

            Elm.Syntax.Expression.RecordExpr fields ->
                fields
                    |> RangeDict.unionFromListMap
                        (\(Elm.Syntax.Node.Node _ ( Elm.Syntax.Node.Node fieldRange _, fieldValue )) ->
                            fieldValue
                                |> step
                                |> RangeDict.insert fieldRange Field
                        )

            Elm.Syntax.Expression.ListExpr elements ->
                elements |> RangeDict.unionFromListMap step

            Elm.Syntax.Expression.RecordAccess record (Elm.Syntax.Node.Node fieldRange _) ->
                record
                    |> step
                    |> RangeDict.insert fieldRange Field

            Elm.Syntax.Expression.RecordAccessFunction _ ->
                RangeDict.singleton expressionRange Field

            Elm.Syntax.Expression.RecordUpdateExpression (Elm.Syntax.Node.Node variableRange _) fields ->
                fields
                    |> RangeDict.unionFromListMap
                        (\(Elm.Syntax.Node.Node _ ( Elm.Syntax.Node.Node fieldRange _, fieldValue )) ->
                            fieldValue
                                |> step
                                |> RangeDict.insert fieldRange Field
                        )
                    |> RangeDict.insert variableRange Variable

            Elm.Syntax.Expression.GLSLExpression _ ->
                RangeDict.empty


nameIsUppercase : String -> Bool
nameIsUppercase string =
    case string |> String.uncons of
        Just ( firstChar, _ ) ->
            firstChar |> Char.isUpper

        Nothing ->
            False


tokenFindRangeIn :
    Elm.Syntax.Range.Range
    ->
        { rawSourceCode : List String
        , commentRanges : List Elm.Syntax.Range.Range
        }
    -> (String -> Maybe Elm.Syntax.Range.Range)
tokenFindRangeIn searchRange context token =
    let
        searchLines : List String
        searchLines =
            context.rawSourceCode
                |> stringLinesSlice searchRange
                |> String.lines

        operatorStartLocationFound : Maybe Elm.Syntax.Range.Location
        operatorStartLocationFound =
            searchLines
                |> List.indexedMap Tuple.pair
                |> List.Extra.findMap
                    (\( searchLineIndex, searchLine ) ->
                        String.indexes token searchLine
                            |> List.Extra.findMap
                                (\operatorOffset ->
                                    let
                                        operatorStartLocation : Elm.Syntax.Range.Location
                                        operatorStartLocation =
                                            case searchLineIndex of
                                                0 ->
                                                    { row = searchRange.start.row
                                                    , column = searchRange.start.column + operatorOffset
                                                    }

                                                searchLineAfterFirstIndex ->
                                                    { row = searchRange.start.row + searchLineAfterFirstIndex
                                                    , column = operatorOffset + 1
                                                    }

                                        isPartOfComment : Bool
                                        isPartOfComment =
                                            List.any
                                                (\commentRange ->
                                                    rangeContainsLocation operatorStartLocation commentRange
                                                )
                                                context.commentRanges
                                    in
                                    if isPartOfComment then
                                        Nothing

                                    else
                                        Just operatorStartLocation
                                )
                    )
    in
    case operatorStartLocationFound of
        Just operatorStartLocation ->
            Just
                { start = operatorStartLocation
                , end =
                    { row = operatorStartLocation.row
                    , column = operatorStartLocation.column + String.length token
                    }
                }

        -- there's a bug somewhere
        Nothing ->
            Nothing


rangeContainsLocation : Elm.Syntax.Range.Location -> Elm.Syntax.Range.Range -> Bool
rangeContainsLocation location range =
    case Elm.Syntax.Range.compareLocations range.start location of
        GT ->
            False

        EQ ->
            False

        LT ->
            case Elm.Syntax.Range.compareLocations range.end location of
                GT ->
                    True

                LT ->
                    False

                EQ ->
                    False


letDeclarationSyntaxKindMap :
    { rawSourceCode : List String, commentRanges : List Elm.Syntax.Range.Range }
    -> (Elm.Syntax.Node.Node Elm.Syntax.Expression.LetDeclaration -> RangeDict SyntaxKind)
letDeclarationSyntaxKindMap context (Elm.Syntax.Node.Node _ letDeclaration) =
    case letDeclaration of
        Elm.Syntax.Expression.LetDestructuring pattern destructuredExpression ->
            RangeDict.union
                (pattern |> patternSyntaxKindMap)
                (destructuredExpression |> expressionSyntaxKindMap context)
                |> RangeDict.insert
                    (let
                        tokenBeforeEqualsEnd : Elm.Syntax.Range.Location
                        tokenBeforeEqualsEnd =
                            pattern |> Elm.Syntax.Node.range |> .end
                     in
                     { start = { column = tokenBeforeEqualsEnd.column + 1, row = tokenBeforeEqualsEnd.row }
                     , end = { column = tokenBeforeEqualsEnd.column + 2, row = tokenBeforeEqualsEnd.row }
                     }
                    )
                    DeclarationRelated

        Elm.Syntax.Expression.LetFunction fnDeclaration ->
            RangeDict.union
                (case fnDeclaration.signature of
                    Just (Elm.Syntax.Node.Node _ signature) ->
                        signature |> signatureSyntaxKindMap

                    Nothing ->
                        RangeDict.empty
                )
                (let
                    implementation : Elm.Syntax.Expression.FunctionImplementation
                    implementation =
                        fnDeclaration.declaration |> Elm.Syntax.Node.value

                    implementationNameRange : Elm.Syntax.Range.Range
                    implementationNameRange =
                        implementation.name |> Elm.Syntax.Node.range
                 in
                 RangeDict.union
                    (implementation.expression |> expressionSyntaxKindMap context)
                    (implementation.arguments |> RangeDict.unionFromListMap patternSyntaxKindMap)
                    |> RangeDict.insert implementationNameRange Variable
                    |> RangeDict.insert
                        (let
                            tokenBeforeEqualsEnd : Elm.Syntax.Range.Location
                            tokenBeforeEqualsEnd =
                                case implementation.arguments |> List.Extra.last of
                                    Just (Elm.Syntax.Node.Node lastPatternRange _) ->
                                        lastPatternRange.end

                                    Nothing ->
                                        implementationNameRange.end
                         in
                         { start = { column = tokenBeforeEqualsEnd.column + 1, row = tokenBeforeEqualsEnd.row }
                         , end = { column = tokenBeforeEqualsEnd.column + 2, row = tokenBeforeEqualsEnd.row }
                         }
                        )
                        DeclarationRelated
                )


stringLinesSlice : Elm.Syntax.Range.Range -> List String -> String
stringLinesSlice rangeToExtract lines =
    case List.drop (rangeToExtract.start.row - 1) lines of
        [] ->
            ""

        firstLine :: rest ->
            if rangeToExtract.start.row == rangeToExtract.end.row then
                String.slice
                    (rangeToExtract.start.column - 1)
                    (rangeToExtract.end.column - 1)
                    firstLine

            else
                let
                    restLinesTaken : { linesTaken : String, lastLine : Maybe String }
                    restLinesTaken =
                        linesTake (rangeToExtract.end.row - rangeToExtract.start.row - 1) rest ""
                in
                String.dropLeft (rangeToExtract.start.column - 1) firstLine
                    ++ restLinesTaken.linesTaken
                    ++ (case restLinesTaken.lastLine of
                            Just lastLine ->
                                "\n" ++ String.left (rangeToExtract.end.column - 1) lastLine

                            Nothing ->
                                ""
                       )


linesTake : Int -> List String -> String -> { linesTaken : String, lastLine : Maybe String }
linesTake n lines linesTaken =
    if n <= 0 then
        { linesTaken = linesTaken, lastLine = List.head lines }

    else
        case lines of
            [] ->
                { linesTaken = linesTaken, lastLine = Nothing }

            line :: rest ->
                linesTake (n - 1)
                    rest
                    (linesTaken ++ "\n" ++ line)


typeAnnotationSyntaxKindMap : Elm.Syntax.Node.Node Elm.Syntax.TypeAnnotation.TypeAnnotation -> RangeDict SyntaxKind
typeAnnotationSyntaxKindMap (Elm.Syntax.Node.Node typeRange type_) =
    -- IGNORE TCO
    case type_ of
        Elm.Syntax.TypeAnnotation.GenericType _ ->
            RangeDict.singleton typeRange Variable

        Elm.Syntax.TypeAnnotation.Typed qualified arguments ->
            RangeDict.union
                (qualified |> qualifiedSyntaxKindMap Type)
                (RangeDict.unionFromListMap typeAnnotationSyntaxKindMap arguments)

        Elm.Syntax.TypeAnnotation.Unit ->
            RangeDict.singleton typeRange Type

        Elm.Syntax.TypeAnnotation.Tupled parts ->
            RangeDict.unionFromListMap typeAnnotationSyntaxKindMap parts

        Elm.Syntax.TypeAnnotation.Record fields ->
            fields
                |> RangeDict.unionFromListMap
                    (\(Elm.Syntax.Node.Node _ ( Elm.Syntax.Node.Node fieldNameRange _, field )) ->
                        field
                            |> typeAnnotationSyntaxKindMap
                            |> RangeDict.insert fieldNameRange Field
                    )

        Elm.Syntax.TypeAnnotation.GenericRecord (Elm.Syntax.Node.Node variableRange _) (Elm.Syntax.Node.Node _ additionalFields) ->
            additionalFields
                |> RangeDict.unionFromListMap (\(Elm.Syntax.Node.Node _ ( _, field )) -> field |> typeAnnotationSyntaxKindMap)
                |> RangeDict.insert variableRange Variable

        Elm.Syntax.TypeAnnotation.FunctionTypeAnnotation input output ->
            RangeDict.union
                (input |> typeAnnotationSyntaxKindMap)
                (output |> typeAnnotationSyntaxKindMap)


signatureSyntaxKindMap : Elm.Syntax.Signature.Signature -> RangeDict SyntaxKind
signatureSyntaxKindMap signature =
    signature.typeAnnotation
        |> typeAnnotationSyntaxKindMap
        |> RangeDict.insert (signature.name |> Elm.Syntax.Node.range) Variable


declarationSyntaxKindMap :
    { rawSourceCode : List String, commentRanges : List Elm.Syntax.Range.Range }
    -> (Elm.Syntax.Node.Node Elm.Syntax.Declaration.Declaration -> RangeDict SyntaxKind)
declarationSyntaxKindMap context (Elm.Syntax.Node.Node declarationRange declaration) =
    case declaration of
        Elm.Syntax.Declaration.FunctionDeclaration fnDeclaration ->
            RangeDict.union
                (case fnDeclaration.signature of
                    Just (Elm.Syntax.Node.Node _ signature) ->
                        signature |> signatureSyntaxKindMap

                    Nothing ->
                        RangeDict.empty
                )
                (let
                    implementation : Elm.Syntax.Expression.FunctionImplementation
                    implementation =
                        fnDeclaration.declaration |> Elm.Syntax.Node.value

                    implementationNameRange : Elm.Syntax.Range.Range
                    implementationNameRange =
                        implementation.name |> Elm.Syntax.Node.range
                 in
                 RangeDict.union
                    (implementation.expression |> expressionSyntaxKindMap context)
                    (implementation.arguments |> RangeDict.unionFromListMap patternSyntaxKindMap)
                    |> RangeDict.insert implementationNameRange Variable
                    |> RangeDict.insert
                        (let
                            tokenBeforeEqualsEnd : Elm.Syntax.Range.Location
                            tokenBeforeEqualsEnd =
                                case implementation.arguments |> List.Extra.last of
                                    Just (Elm.Syntax.Node.Node lastPatternRange _) ->
                                        lastPatternRange.end

                                    Nothing ->
                                        implementationNameRange.end
                         in
                         { start = { column = tokenBeforeEqualsEnd.column + 1, row = tokenBeforeEqualsEnd.row }
                         , end = { column = tokenBeforeEqualsEnd.column + 2, row = tokenBeforeEqualsEnd.row }
                         }
                        )
                        DeclarationRelated
                )

        Elm.Syntax.Declaration.AliasDeclaration aliasTypeDeclaration ->
            RangeDict.union
                (aliasTypeDeclaration.typeAnnotation |> typeAnnotationSyntaxKindMap)
                (aliasTypeDeclaration.generics
                    |> RangeDict.mapFromList (\(Elm.Syntax.Node.Node variableRange _) -> ( variableRange, Variable ))
                )
                |> RangeDict.insert
                    (Elm.Syntax.Node.range aliasTypeDeclaration.name)
                    Type
                |> RangeDict.insert
                    { start = declarationRange.start
                    , end = { row = declarationRange.start.row, column = declarationRange.start.column + 10 }
                    }
                    DeclarationRelated
                |> RangeDict.insert
                    (let
                        tokenBeforeEqualsEnd : Elm.Syntax.Range.Location
                        tokenBeforeEqualsEnd =
                            case aliasTypeDeclaration.generics |> List.Extra.last of
                                Just (Elm.Syntax.Node.Node lastPatternRange _) ->
                                    lastPatternRange.end

                                Nothing ->
                                    aliasTypeDeclaration.name |> Elm.Syntax.Node.range |> .end
                     in
                     { start = { column = tokenBeforeEqualsEnd.column + 1, row = tokenBeforeEqualsEnd.row }
                     , end = { column = tokenBeforeEqualsEnd.column + 2, row = tokenBeforeEqualsEnd.row }
                     }
                    )
                    DeclarationRelated

        Elm.Syntax.Declaration.CustomTypeDeclaration choiceTypeDeclaration ->
            RangeDict.union
                (choiceTypeDeclaration.constructors
                    |> RangeDict.unionFromListMap
                        (\(Elm.Syntax.Node.Node _ variant) ->
                            let
                                variantNameRange : Elm.Syntax.Range.Range
                                variantNameRange =
                                    variant.name |> Elm.Syntax.Node.range
                            in
                            variant.arguments
                                |> RangeDict.unionFromListMap typeAnnotationSyntaxKindMap
                                |> RangeDict.insert variantNameRange Variant
                                |> RangeDict.insert
                                    { start = { column = variantNameRange.start.column - 2, row = variantNameRange.start.row }
                                    , end = { column = variantNameRange.start.column - 1, row = variantNameRange.start.row }
                                    }
                                    DeclarationRelated
                        )
                )
                (choiceTypeDeclaration.generics
                    |> RangeDict.mapFromList (\(Elm.Syntax.Node.Node variableRange _) -> ( variableRange, Variable ))
                )
                |> RangeDict.insert
                    (Elm.Syntax.Node.range choiceTypeDeclaration.name)
                    Type
                |> RangeDict.insert
                    { start = declarationRange.start
                    , end = { row = declarationRange.start.row, column = declarationRange.start.column + 4 }
                    }
                    DeclarationRelated

        Elm.Syntax.Declaration.PortDeclaration signature ->
            signature
                |> signatureSyntaxKindMap
                |> RangeDict.insert
                    { start = declarationRange.start
                    , end = { row = declarationRange.start.row, column = declarationRange.start.column + 4 }
                    }
                    DeclarationRelated

        Elm.Syntax.Declaration.InfixDeclaration _ ->
            RangeDict.empty

        Elm.Syntax.Declaration.Destructuring _ _ ->
            RangeDict.empty


{-| Assumes `elm-format`ed code
-}
for : String -> SyntaxHighlightable
for rawSourceCodeWithDotDotAndQuestionMarkQuestionMarks =
    -- TODO make what to parse explicit (module vs declarations vs expression vs type vs pattern)
    let
        rawSourceCode : String
        rawSourceCode =
            rawSourceCodeWithDotDotAndQuestionMarkQuestionMarks
                |> String.replace "..expression.." "expressionD___"
                |> String.replace "??expression??" "expressionQ___"
                |> String.replace "..Type.." "TypeD___"
                |> String.replace "??Type??" "TypeQ___"

        syntaxKindByRange : RangeDict SyntaxKind
        syntaxKindByRange =
            List.Extra.findMap (\f -> f ())
                [ \() ->
                    case rawSourceCode |> Elm.Parser.parseToFile of
                        Ok file ->
                            RangeDict.unionFromListMap identity
                                [ file.moduleDefinition |> moduleHeaderSyntaxKindMap
                                , file.comments |> RangeDict.unionFromListMap commentSyntaxKindMap
                                , file.imports
                                    |> RangeDict.unionFromListMap importSyntaxKindMap
                                , file.declarations
                                    |> RangeDict.unionFromListMap
                                        (declarationSyntaxKindMap
                                            { rawSourceCode = rawSourceCode |> String.lines
                                            , commentRanges = file.comments |> List.map Elm.Syntax.Node.range
                                            }
                                        )
                                ]
                                |> Just

                        Err _ ->
                            Nothing
                , \() ->
                    let
                        moduleSourceCode : String
                        moduleSourceCode =
                            "module A exposing (..)\n" ++ rawSourceCode
                    in
                    case moduleSourceCode |> Elm.Parser.parseToFile of
                        Ok fileWithoutHeader ->
                            RangeDict.unionFromListMap identity
                                [ fileWithoutHeader.imports
                                    |> RangeDict.unionFromListMap importSyntaxKindMap
                                , fileWithoutHeader.declarations
                                    |> RangeDict.unionFromListMap
                                        (declarationSyntaxKindMap
                                            { rawSourceCode = moduleSourceCode |> String.lines
                                            , commentRanges = fileWithoutHeader.comments |> List.map Elm.Syntax.Node.range
                                            }
                                        )
                                , fileWithoutHeader.comments |> RangeDict.unionFromListMap commentSyntaxKindMap
                                ]
                                |> RangeDict.justValuesMap
                                    (\range value ->
                                        if range.start.row <= 1 then
                                            Nothing

                                        else
                                            Just value
                                    )
                                |> RangeDict.toListMap (\range syntaxKind -> ( range |> rangeAddRow -1, syntaxKind ))
                                |> RangeDict.mapFromList identity
                                |> Just

                        Err _ ->
                            Nothing
                , \() ->
                    let
                        moduleSourceCode : String
                        moduleSourceCode =
                            "module A exposing (..)\na =\n"
                                ++ (rawSourceCode
                                        |> String.lines
                                        |> List.map (\line -> "    " ++ line)
                                        |> String.join "\n"
                                   )
                    in
                    case moduleSourceCode |> Elm.Parser.parseToFile of
                        Ok fileWithoutHeaderAndFnDeclarationHeader ->
                            fileWithoutHeaderAndFnDeclarationHeader.declarations
                                |> RangeDict.unionFromListMap
                                    (declarationSyntaxKindMap
                                        { rawSourceCode = moduleSourceCode |> String.lines
                                        , commentRanges = fileWithoutHeaderAndFnDeclarationHeader.comments |> List.map Elm.Syntax.Node.range
                                        }
                                    )
                                |> RangeDict.justValuesMap
                                    (\range value ->
                                        if range.start.row <= 2 then
                                            Nothing

                                        else
                                            Just value
                                    )
                                |> RangeDict.toListMap (\range syntaxKind -> ( range |> rangeAddRow -2 |> rangeAddColumn -4, syntaxKind ))
                                |> RangeDict.mapFromList identity
                                |> Just

                        Err _ ->
                            Nothing
                ]
                |> Maybe.withDefault RangeDict.empty

        rawSourceCodeLines : List String
        rawSourceCodeLines =
            rawSourceCode |> String.lines

        segmented : { location : Elm.Syntax.Range.Location, segmentsReverse : List { range : Elm.Syntax.Range.Range, syntaxKind : Maybe SyntaxKind } }
        segmented =
            syntaxKindByRange
                |> RangeDict.foldl
                    (\range syntaxKind state ->
                        { location = range.end
                        , segmentsReverse =
                            if state.location == range.start then
                                { range = range, syntaxKind = Just syntaxKind }
                                    :: state.segmentsReverse

                            else
                                { range = range, syntaxKind = Just syntaxKind }
                                    :: { range = { start = state.location, end = range.start }, syntaxKind = Nothing }
                                    :: state.segmentsReverse
                        }
                    )
                    { location = { row = 1, column = 1 }
                    , segmentsReverse = []
                    }
    in
    { range =
        { start = segmented.location
        , end =
            { row = (rawSourceCodeLines |> List.length) + 1
            , column =
                case rawSourceCodeLines |> List.Extra.last of
                    Just last ->
                        (last |> String.length) + 1

                    Nothing ->
                        0
            }
        }
    , syntaxKind = Nothing
    }
        :: segmented.segmentsReverse
        |> listReverseAndMap
            (\segment ->
                case ( rawSourceCodeLines |> stringLinesSlice segment.range, segment.syntaxKind ) of
                    ( "expressionD___", Just Variable ) ->
                        { string = "...", syntaxKind = Nothing }

                    ( "expressionQ___", Just Variable ) ->
                        { string = "??", syntaxKind = Nothing }

                    ( "TypeD___", Just Type ) ->
                        { string = "...", syntaxKind = Nothing }

                    ( "TypeQ___", Just Type ) ->
                        { string = "??", syntaxKind = Nothing }

                    ( nonSpecialCaseString, syntaxKind ) ->
                        { string = nonSpecialCaseString, syntaxKind = syntaxKind }
            )


listReverseAndMap : (a -> b) -> (List a -> List b)
listReverseAndMap elementChange listReverse =
    listReverse
        |> List.foldl
            (\element soFar -> (element |> elementChange) :: soFar)
            []


moduleHeaderSyntaxKindMap : Elm.Syntax.Node.Node Elm.Syntax.Module.Module -> RangeDict SyntaxKind
moduleHeaderSyntaxKindMap (Elm.Syntax.Node.Node moduleHeaderRange moduleHeader) =
    case moduleHeader of
        Elm.Syntax.Module.EffectModule _ ->
            RangeDict.empty

        Elm.Syntax.Module.NormalModule normalModuleHeader ->
            normalModuleHeader.exposingList
                |> exposingSyntaxKindMap
                |> RangeDict.insert (normalModuleHeader.moduleName |> Elm.Syntax.Node.range)
                    ModuleNameOrAlias
                |> RangeDict.insert
                    { start = moduleHeaderRange.start
                    , end = { row = moduleHeaderRange.start.row, column = moduleHeaderRange.start.column + 6 }
                    }
                    DeclarationRelated

        Elm.Syntax.Module.PortModule portModuleHeader ->
            portModuleHeader.exposingList
                |> exposingSyntaxKindMap
                |> RangeDict.insert (portModuleHeader.moduleName |> Elm.Syntax.Node.range) ModuleNameOrAlias
                |> RangeDict.insert
                    { start = moduleHeaderRange.start
                    , end = { row = moduleHeaderRange.start.row, column = moduleHeaderRange.start.column + 6 }
                    }
                    DeclarationRelated


commentSyntaxKindMap : Elm.Syntax.Node.Node Elm.Syntax.Comments.Comment -> RangeDict SyntaxKind
commentSyntaxKindMap (Elm.Syntax.Node.Node commentRange comment) =
    if comment |> String.startsWith "--: " then
        let
            rawModuleSourceCode : String
            rawModuleSourceCode =
                "module A exposing (..)\ntype alias A =\n    "
                    ++ (comment |> String.dropLeft 4)
        in
        case rawModuleSourceCode |> Elm.Parser.parseToFile of
            Ok fileWithoutHeaderAndFnDeclarationHeader ->
                fileWithoutHeaderAndFnDeclarationHeader.declarations
                    |> RangeDict.unionFromListMap
                        (declarationSyntaxKindMap
                            { rawSourceCode = rawModuleSourceCode |> String.lines, commentRanges = [] }
                        )
                    |> RangeDict.justValuesMap
                        (\range value ->
                            if range.start.row <= 2 then
                                Nothing

                            else
                                Just value
                        )
                    |> RangeDict.toListMap
                        (\range syntaxKind ->
                            ( { start = { row = commentRange.start.row, column = commentRange.start.column + range.start.column - 1 }
                              , end = { row = commentRange.start.row, column = commentRange.start.column + range.end.column - 1 }
                              }
                            , syntaxKind
                            )
                        )
                    |> RangeDict.mapFromList identity

            Err _ ->
                RangeDict.empty

    else
        RangeDict.empty


importSyntaxKindMap : Elm.Syntax.Node.Node Elm.Syntax.Import.Import -> RangeDict SyntaxKind
importSyntaxKindMap (Elm.Syntax.Node.Node importRange import_) =
    RangeDict.union
        ((case import_.exposingList of
            Nothing ->
                RangeDict.empty

            Just exposingList ->
                exposingList |> exposingSyntaxKindMap
         )
            |> RangeDict.insert
                { start = importRange.start
                , end = { row = importRange.start.row, column = importRange.start.column + 6 }
                }
                DeclarationRelated
            |> RangeDict.insert (import_.moduleName |> Elm.Syntax.Node.range) ModuleNameOrAlias
        )
        (case import_.moduleAlias of
            Nothing ->
                RangeDict.empty

            Just (Elm.Syntax.Node.Node aliasRange _) ->
                RangeDict.singleton aliasRange ModuleNameOrAlias
                    |> RangeDict.insert
                        { start = { column = aliasRange.start.column - 3, row = aliasRange.start.row }
                        , end = { column = aliasRange.start.column - 1, row = aliasRange.start.row }
                        }
                        DeclarationRelated
        )


rangeAddRow : Int -> Elm.Syntax.Range.Range -> Elm.Syntax.Range.Range
rangeAddRow rowPlus range =
    { start = range.start |> locationAddRow rowPlus
    , end = range.end |> locationAddRow rowPlus
    }


locationAddRow : Int -> Elm.Syntax.Range.Location -> Elm.Syntax.Range.Location
locationAddRow rowPlus location =
    { row = location.row + rowPlus, column = location.column }


rangeAddColumn : Int -> Elm.Syntax.Range.Range -> Elm.Syntax.Range.Range
rangeAddColumn columnPlus range =
    { start = range.start |> locationAddColumn columnPlus
    , end = range.end |> locationAddColumn columnPlus
    }


exposingSyntaxKindMap : Elm.Syntax.Node.Node Elm.Syntax.Exposing.Exposing -> RangeDict SyntaxKind
exposingSyntaxKindMap (Elm.Syntax.Node.Node exposingRange exposing_) =
    let
        exposingKeywordRange : Elm.Syntax.Range.Range
        exposingKeywordRange =
            { start = { column = exposingRange.start.column, row = exposingRange.start.row }
            , end = { column = exposingRange.start.column + 8, row = exposingRange.start.row }
            }
    in
    case exposing_ of
        Elm.Syntax.Exposing.All _ ->
            RangeDict.singleton exposingKeywordRange DeclarationRelated

        Elm.Syntax.Exposing.Explicit exposedMembers ->
            exposedMembers
                |> RangeDict.unionFromListMap
                    (\(Elm.Syntax.Node.Node exposedMemberRange exposedMember) ->
                        case exposedMember of
                            Elm.Syntax.Exposing.InfixExpose _ ->
                                RangeDict.empty

                            Elm.Syntax.Exposing.FunctionExpose _ ->
                                RangeDict.singleton exposedMemberRange Variable

                            Elm.Syntax.Exposing.TypeOrAliasExpose _ ->
                                RangeDict.singleton exposedMemberRange Type

                            Elm.Syntax.Exposing.TypeExpose exposedType ->
                                case exposedType.open of
                                    Nothing ->
                                        RangeDict.singleton exposedMemberRange Type

                                    Just openRange ->
                                        RangeDict.singleton
                                            { start = exposedMemberRange.start, end = openRange.start }
                                            Type
                                            |> RangeDict.insert openRange
                                                Variant
                    )
                |> RangeDict.insert exposingKeywordRange DeclarationRelated
