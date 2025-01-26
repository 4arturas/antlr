import antlr4 from 'antlr4';
import ExprLexer from "./gen/ExprLexer.js";
import ExprParser from "./gen/ExprParser.js";
import ExprVisitor from "./gen/ExprVisitor.js";

const EXPR_PROGRAM = 0;
const EXPR_DECLARATION = 1;
const EXPR_MUL = 2;
const EXPR_ADD = 3;
const EXPR_VARIABLE = 4;
const EXPR_NUMBER = 5;

function create_Program( exprType, expressions, semanticErrors )
{
    return { exprType, expressions, semanticErrors }
}

function create_Declaration( exprType, id, type, value )
{
    return { exprType, id, type, value }
}

function create_AddMul( exprType, left, right )
{
    return { exprType, left, right }
}

function create_Variable( exprType, id )
{
    return { exprType, id }
}

function create_Number( exprType, num )
{
    return { exprType, num }
}

function expression_ToString( e )
{
    switch ( e.exprType )
    {
        case EXPR_PROGRAM:
            return `EXPR_PROGRAM undefined`;
        case EXPR_DECLARATION:
            return 'EXPR_DECLARATION undefined';
        case EXPR_MUL:
            return `${expression_ToString( e.left )} * ${expression_ToString( e.right )}`;
        case EXPR_ADD:
            return `${expression_ToString( e.left )} + ${expression_ToString( e.right )}`;
        case EXPR_VARIABLE:
            return e.id;
        case EXPR_NUMBER:
            return e.num;
        default:
            return 'UNDEFINED';
    }
}


class ExprEvaluator extends ExprVisitor {

    constructor() {
        super();
        this.expressions = [];
        this.semanticErrors = [];
        this.vars = [];
    }

    // Visit a parse tree produced by ExprParser#Program.
    visitProgram(ctx) {
        for ( let i = 0; i < ctx.getChildCount(); i++ )
        {
            if ( i === ctx.getChildCount()-1 )
                continue;

            const expression = this.visit( ctx.getChild(i) );
            this.expressions.push( expression );
        }
        // return program;
        return create_Program( EXPR_PROGRAM, this.expressions, this.semanticErrors );
    }


    // Visit a parse tree produced by ExprParser#Declaration.
    visitDeclaration(ctx) {
        const idToken = ctx.ID().getSymbol(); // equivalent to: ctx.getChild(0).getSymbol()
        const line = idToken.line;
        const column = idToken.column + 1;

        const id = ctx.getChild(0).getText();
        if (this.vars.includes(id))
            this.semanticErrors.push("Error2: variable " + id + " already declared (" + line + ", " + column + ")");
        else
            this.vars.push(id);

        const type = ctx.getChild(2).getText();
        const value = parseInt(ctx.NUM().getText());
        return create_Declaration( EXPR_DECLARATION, id, type, value );
    }


    // Visit a parse tree produced by ExprParser#Multiplication.
    visitMultiplication(ctx) {
        const left = this.visit(ctx.getChild(0));
        const right = this.visit(ctx.getChild(2));
        return create_AddMul( EXPR_MUL, left, right );
    }


    // Visit a parse tree produced by ExprParser#Addition.
    visitAddition(ctx) {
        const left = this.visit(ctx.getChild(0));
        const right = this.visit(ctx.getChild(2));
        return create_AddMul( EXPR_ADD, left, right );
    }


    // Visit a parse tree produced by ExprParser#Variable.
    visitVariable(ctx) {
        const idToken = ctx.ID().getSymbol();
        const line = idToken.line;
        const column = idToken.column + 1;

        const id = ctx.ID().getText();
        if (!this.vars.find(f => f === id))
            this.semanticErrors.push("Error1: variable " + id + " not declared (" + line + ", " + column + ")");

        return create_Variable( EXPR_VARIABLE, id );
    }


    // Visit a parse tree produced by ExprParser#Number.
    visitNumber(ctx) {
        const numText = ctx.getChild(0).getText();
        const num = parseInt(numText);
        return create_Number( EXPR_NUMBER, num );
    }
}

const g_ValuesMap = {};
function get_EvalResult( expression )
{
    let result = 0;

    if ( expression.exprType === EXPR_NUMBER )
    {
        result = expression.num;
    }
    else if ( expression.exprType === EXPR_VARIABLE )
    {
        const id = expression.id;
        result = g_ValuesMap[id];
    }
    else if ( expression.exprType === EXPR_ADD )
    {
        const left = get_EvalResult( expression.left );
        const right = get_EvalResult( expression.right );
        result = left + right;
    }
    else if ( expression.exprType === EXPR_MUL )
    {
        const left = get_EvalResult( expression.left );
        const right = get_EvalResult( expression.right );
        result = left * right;
    }
    else
    {
        throw Error('Unrecognized expression type');
    }

    return result;
}
function get_EvaluationResults( expressions )
{
    const evaluations = [];
    for ( let i = 0; i < expressions.length; i++ )
    {
        const e = expressions[i];
        if ( e.exprType === EXPR_DECLARATION )
        {
            g_ValuesMap[e.id] = e.value;
        }
        else // e instance Number, Variable, Addition, Subtraction
        {
            const input = expression_ToString(e);
            const result = get_EvalResult(e);
            evaluations.push( input + " is " + result);
        }
    }
    return evaluations;
}

function evaluate(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new ExprLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new ExprParser(tokens);
    const tree = parser.prog();

    const evaluator = new ExprEvaluator();
    const program = evaluator.visit(tree);
    return program;
}

// Example usage
// const input = "3 + 5 * (2 - 8)";
const input0 = `
i: INT = 7
 i: INT = 5
j = i + 23: INT
24 * k
   i: INT = 9
`;

const input1 = `
i: INT = 5
 i: INT = 7
i + 23
24 * k
i: INT = 9
`;

const input2 = `
i: INT = 5
j: INT = 7
i
j
i + j
i * j
i + j * 3
i * j + 3
`;

const input = input2;

const { expressions, semanticErrors } = evaluate(input);

if ( semanticErrors.length > 0 )
    semanticErrors
        .forEach( e => console.error( e ) );
else
    get_EvaluationResults( expressions )
        .forEach( r => console.log( r ) );
