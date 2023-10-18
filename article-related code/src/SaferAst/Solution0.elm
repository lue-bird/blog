module SaferAst.Solution0 exposing (EqualsExpression(..), EqualsExpressionByType(..), EqualsOf, Expression(..), TupleOf, testExpression)


type Expression
    = Int Int
    | Tuple (TupleOf Expression Expression)
    | Equals EqualsExpression


type alias TupleOf first second =
    { first : first, second : second }


type alias EqualsOf specificExpression =
    { left : specificExpression, right : specificExpression }


type EqualsExpression
    = EqualsExpression (EqualsExpressionByType Int EqualsExpression)


type EqualsExpressionByType int equals
    = EqualsOfInt (EqualsOf int)
    | EqualsOfEqualsExpression (EqualsOf equals)
    | EqualsOfTupleExtendedByFirstInt (EqualsExpressionByType (TupleOf Int int) (TupleOf Int equals))
    | EqualsOfTupleExtendedByFirstEqualsExpression (EqualsExpressionByType (TupleOf EqualsExpression int) (TupleOf EqualsExpression equals))
    | EqualsOfTupleExtendedBySecondInt (EqualsExpressionByType (TupleOf int Int) (TupleOf equals Int))
    | EqualsOfTupleExtendedBySecondEqualsExpression (EqualsExpressionByType (TupleOf int EqualsExpression) (TupleOf equals EqualsExpression))


{-| ( 0, 0 == 0 ) == ( 0, 0 == 0 )
-}
testExpression : Expression
testExpression =
    Equals
        (EqualsExpression
            (EqualsOfTupleExtendedByFirstInt
                (EqualsOfEqualsExpression
                    { left =
                        { first = 0
                        , second = EqualsExpression (EqualsOfInt { left = 0, right = 0 })
                        }
                    , right =
                        { first = 0
                        , second = EqualsExpression (EqualsOfInt { left = 0, right = 0 })
                        }
                    }
                )
            )
        )
