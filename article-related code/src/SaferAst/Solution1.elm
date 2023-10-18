module SaferAst.Solution1 exposing (EqualsExpression(..), EqualsOf, Expression(..), TupleOf)


type Expression
    = Int Int
    | Tuple (TupleOf Expression Expression)
    | Equals EqualsExpression


type alias TupleOf first second =
    { first : first, second : second }


type alias EqualsOf specificExpression =
    { left : specificExpression, right : specificExpression }


type EqualsExpression
    = EqualsOfInt (EqualsOf Int)
    | EqualsOfExpression (EqualsOf EqualsExpression)
    | EqualsOfTuple { firsts : EqualsExpression, seconds : EqualsExpression }
    | EqualsOfTriple { firsts : EqualsExpression, seconds : EqualsExpression, thirds : EqualsExpression }
