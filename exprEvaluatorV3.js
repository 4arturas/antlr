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
class ExprEvaluatorV3 extends ExprVisitor
{

// Visit a parse tree produced by ExprParser#Program.
    visitProgram(ctx) {
        return this.visitChildren( ctx );
    }


    // Visit a parse tree produced by ExprParser#Declaration.
    visitDeclaration(ctx) {
        const id = ctx.ID().getText();
        const int_type = ctx.INT_TYPE().getText();
        const num = ctx.NUM().getText();
        return create_Node( DECLARATION, null, [id, int_type,num]);
    }


    // Visit a parse tree produced by ExprParser#Multiplication.
    visitMultiplication(ctx) {
        const left = this.visit( ctx.getChild(0) );
        const right = this.visit( ctx.getChild( 2 ) );
        return create_Node( MULTIPLICATION, "*", [left, right]);
    }


    // Visit a parse tree produced by ExprParser#Addition.
    visitAddition(ctx) {
        const left = this.visit( ctx.getChild( 0 ) );
        const right = this.visit( ctx.getChild( 2 ) );
        return create_Node( ADDITION, "+", [left, right]);
    }


    // Visit a parse tree produced by ExprParser#Variable.
    visitVariable(ctx) {
        const id = ctx.ID().getText();
        return create_Node( VARIABLE, id );
    }


    // Visit a parse tree produced by ExprParser#Number.
    visitNumber(ctx)
    {
        const numText = ctx.NUM().getText();
        return create_Node( NUMBER, numText );
    }
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

function evaluate( input )
{
    const chars = new antlr4.InputStream( input );
    const lexer = new ExprLexer( chars );
    const tokens = new antlr4.CommonTokenStream( lexer );
    const parser = new ExprParser( tokens );
    const tree = parser.prog();
    const evaluator = new ExprEvaluatorV3();
    const program = evaluator.visit( tree );
    return program;
}

const program = evaluate( input );
program.pop(); // remove last element
// console.log( program );

function expressionToString( e )
{
    switch ( e.id )
    {
        case DECLARATION:
            mapValues[e.children[0]] = e.children[2];
            return `${e.children[1]} ${e.children[0]} = ${e.children[2]}`
        case VARIABLE:
            return `${e.value}`;
        case ADDITION:
            return `${expressionToString( e.children[0])} + ${expressionToString( e.children[1])}`;
        case MULTIPLICATION:
            return `${expressionToString( e.children[0])} * ${expressionToString( e.children[1])}`;
        case NUMBER:
            return e.value;
    }
}

function expressionEval( e )
{
    switch ( e.id )
    {
        case VARIABLE:
            return parseInt( mapValues[e.value] );
        case ADDITION:
            return expressionEval( e.children[0] ) + expressionEval( e.children[1] );
        case MULTIPLICATION:
            return expressionEval( e.children[0] ) * expressionEval( e.children[1] );
        case NUMBER:
            return parseInt( e.value );
    }
}

for ( let i = 0; i < program.length; i++ )
{
    const expression = program[i];
    const exprStr = expressionToString( expression );
    if ( expression.id === DECLARATION )
    {
        console.log( exprStr );
        continue;
    }
    const exprRes = expressionEval( expression );
    console.log( `${exprStr} = ${exprRes}` );
    // console.log( expression );
}