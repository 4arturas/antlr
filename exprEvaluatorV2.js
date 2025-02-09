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
const vars = [];
const semanticErrors = [];
class ExprEvaluatorV4 extends ExprVisitor
{

    // Visit a parse tree produced by ExprParser#Program.
    visitProgram(ctx) {
        return this.visitChildren(ctx);
    }


    // Visit a parse tree produced by ExprParser#Declaration.
    visitDeclaration(ctx) {
        const INT_TYPE = ctx.INT_TYPE().getText();
        const VAR = ctx.VAR().getText();
        const NUM = ctx.NUM().getText();
        if ( vars.includes( VAR ) )
            semanticErrors.push( "Variable already exists: " + VAR );
        else
            vars.push( VAR );
        mapValues[VAR] = NUM;
        return create_Node( DECLARATION, null, [INT_TYPE, VAR, NUM] );
    }


    // Visit a parse tree produced by ExprParser#Multiplication.
    visitMultiplication(ctx) {
        const left = this.visit( ctx.getChild( 0 ) );
        const sign = ctx.getChild( 1 ).getText();
        const right = this.visit( ctx.getChild( 2 ) );
        return create_Node( MULTIPLICATION, sign, [left, right] );
    }


    // Visit a parse tree produced by ExprParser#Addition.
    visitAddition(ctx) {
        const left = this.visit( ctx.getChild( 0 ) );
        const sign = ctx.getChild( 1 ).getText();
        const right = this.visit( ctx.getChild( 2 ) );
        return create_Node( ADDITION, sign, [left, right] );
    }


    // Visit a parse tree produced by ExprParser#Variable.
    visitVariable(ctx) {
        const VAR = ctx.VAR().getText();
        if ( !vars.includes( VAR ) )
            semanticErrors.push( "Variable does not exist " + VAR );
        return create_Node( VARIABLE, VAR );
    }


    // Visit a parse tree produced by ExprParser#Number.
    visitNumber(ctx) {
        return create_Node( NUMBER, ctx.NUM().getText() );
    }


}

const input = `
INT i = 5
INT j = 7
i
j
i + j
i * j
i + j * 3
i * j + 3
`;

function evaluate( input )
{
    const char = new antlr4.InputStream( input );
    const lexer = new ExprLexer( char );
    const tokens = new antlr4.CommonTokenStream( lexer );
    const parser = new ExprParser( tokens );
    const tree = parser.prog();
    const evaluator = new ExprEvaluatorV4();
    const program = evaluator.visit( tree );
    return program;
}

const program = evaluate( input );
program.pop(); // remove last element
// console.log( program );

function expression_ToString( e )
{
    switch ( e.id )
    {
        case DECLARATION:
            return `${e.children[0]} ${e.children[1]}`;
        case VARIABLE:
            return e.value;
        case MULTIPLICATION:
            return `${expression_ToString( e.children[0] )} * ${expression_ToString( e.children[1] )}`;
        case ADDITION:
            return `${expression_ToString( e.children[0] )} + ${expression_ToString( e.children[1] )}`;
        case NUMBER:
            return e.value;
    }
}

function expression_Eval( e )
{
    switch ( e.id )
    {
        case DECLARATION:
            return parseInt( e.children[2] );
        case VARIABLE:
            return parseInt( mapValues[e.value] );
        case MULTIPLICATION:
            return expression_Eval( e.children[0] ) * expression_Eval( e.children[1] );
        case ADDITION:
            return expression_Eval( e.children[0] ) + expression_Eval( e.children[1] );
        case NUMBER:
            return parseInt( e.value );
    }
}

for ( let i = 0; i < program.length; i++ )
{
    const expression = program[i];
    const exprStr = expression_ToString( expression );
    const exprEval = expression_Eval( expression );
    console.log( exprStr + " = " + exprEval );
}