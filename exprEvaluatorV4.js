import antlr4 from 'antlr4';
import ExprLexer from "./gen/ExprLexer.js";
import ExprParser from "./gen/ExprParser.js";
import ExprVisitor from "./gen/ExprVisitor.js";

const MULTIPLICATION = 'MULTIPLICATION';
const ADDITION = 'ADDITION';
const VARIABLE = 'VARIABLE';
const NUMBER = 'NUMBER';
const DECLARATION = 'DECLARATION';
const PROGRAM = 'PROGRAM';

function create_Node( id, value, children = [] )
{
    return { id, value, children };
}
const mapValues = {};
class ExprEvaluatorV4 extends ExprVisitor
{

// Visit a parse tree produced by ExprParser#Program.
    visitProgram(ctx) {
        const ret = this.visitChildren(ctx);
        return ret;
    }


    // Visit a parse tree produced by ExprParser#Declaration.
    visitDeclaration(ctx) {
        // const variableName = ctx.getChild( 0 ).getText();
        const ID = ctx.ID().getText();
        const INT_TYPE = ctx.INT_TYPE().getText();
        const NUM = ctx.NUM().getText();
        mapValues[ID] = NUM;
        return create_Node( DECLARATION, NUM, [ID, INT_TYPE, NUM] );
    }


    // Visit a parse tree produced by ExprParser#Multiplication.
    visitMultiplication(ctx) {
        const left = this.visit( ctx.getChild( 0 ) );
        const right = this.visit( ctx.getChild( 2 ) );
        return create_Node( MULTIPLICATION, "*", [left, right] );
    }


    // Visit a parse tree produced by ExprParser#Addition.
    visitAddition(ctx) {
        const left = this.visit( ctx.getChild(0) );
        const right = this.visit( ctx.getChild( 2 ) );
        return create_Node( ADDITION, "+", [left, right]);
    }


    // Visit a parse tree produced by ExprParser#Variable.
    visitVariable(ctx) {
        const id = ctx.ID().getText();
        return create_Node( VARIABLE, id );
    }


    // Visit a parse tree produced by ExprParser#Number.
    visitNumber(ctx) {
        const numText = ctx.NUM().getText();
        return create_Node( NUMBER, numText );
    }
}

function evaluate( input )
{
    const chars = new antlr4.InputStream( input );
    const lexer = new ExprLexer( chars );
    const tokens = new antlr4.CommonTokenStream( lexer );
    const parser = new ExprParser( tokens );
    const tree = parser.prog();
    const evaluator = new ExprEvaluatorV4();
    const program = evaluator.visit( tree );
    return program;
}


const input = `
i: INT = 5
j: INT = 7
i
j
i + j
i * j
i + j * 3
i * j + 3
`;

const program = evaluate( input );
program.pop(); // remove last element
// console.log( program );

function expressionToString( expression )
{
    switch ( expression.id )
    {
        case NUMBER:
            return expression.value;
        case ADDITION:
            return `${expressionToString(expression.children[0])} + ${expressionToString(expression.children[1])}`;
        case MULTIPLICATION:
            return `${expressionToString(expression.children[0])} * ${expressionToString(expression.children[1])}`;
        case VARIABLE:
            return expression.value;
        case DECLARATION:
            return `${expression.children[1]} ${expression.children[0]} = ${expression.children[2]}`;
        default:
            return null;
    }
}

function expressionEvaluate( expression )
{
    switch ( expression.id )
    {
        case NUMBER:
            return parseInt( expression.value );
        case ADDITION:
            return expressionEvaluate(expression.children[0] ) + expressionEvaluate(expression.children[1] );
        case MULTIPLICATION:
            return expressionEvaluate(expression.children[0] ) * expressionEvaluate(expression.children[1] );
        case VARIABLE:
            return parseInt( mapValues[expression.value] );
        case DECLARATION:
            return "";
    }
}

for ( let i = 0; i < program.length; i++ )
{
    const expression = program[i];
    const exprString = expressionToString( expression );
    let output;
    if (expression.id === DECLARATION )
    {
        output = exprString;
    }
    else
    {
        const exprResult = expressionEvaluate( expression );
        output = `${exprString} = ${exprResult}`;
    }
    console.log( output );
}
