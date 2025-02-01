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
        const ID = ctx.ID().getText();
        const NUM = ctx.NUM().getText();
        if ( vars.includes( ID ) )
            semanticErrors.push( "ERROR variable already exists " + ID );
        else
            vars.push( ID );
        mapValues[ID] = NUM;
        return create_Node( DECLARATION, null, [ID, INT_TYPE, NUM]);
    }


    // Visit a parse tree produced by ExprParser#Multiplication.
    visitMultiplication(ctx)
    {
        const left = this.visit( ctx.getChild(0) );
        const right = this.visit( ctx.getChild(2) );
        return create_Node( MULTIPLICATION, "*", [left, right] );
    }


    // Visit a parse tree produced by ExprParser#Addition.
    visitAddition(ctx)
    {
        const left = this.visit( ctx.getChild(0) );
        const right = this.visit( ctx.getChild(2) );
        return create_Node( ADDITION, "+", [left, right] );
    }


    // Visit a parse tree produced by ExprParser#Variable.
    visitVariable(ctx)
    {
        const ID = ctx.ID().getText();
        if ( !vars.includes( ID ) )
            semanticErrors.push( "ERROR variable does not exist " + ID );
        return create_Node( VARIABLE, ID );
    }


    // Visit a parse tree produced by ExprParser#Number.
    visitNumber(ctx) {
        const numTxt = ctx.NUM().getText();
        return create_Node( NUMBER, numTxt );
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
            return `${e.children[1]} ${e.children[0]}`;
        case VARIABLE:
            return e.value;
        case ADDITION:
            return `${expression_ToString( e.children[0] ) } + ${expression_ToString( e.children[1] ) }`;
        case MULTIPLICATION:
            return `${expression_ToString( e.children[0] ) } * ${expression_ToString( e.children[1] ) }`;
        case NUMBER:
            return e.value;
    }
}
function expression_Evaluate( e )
{
    switch ( e.id )
    {
        case DECLARATION:
            return e.children[2];
        case VARIABLE:
            return parseInt( mapValues[e.value] );
        case ADDITION:
            return expression_Evaluate( e.children[0] ) + expression_Evaluate( e.children[1] );
        case MULTIPLICATION:
            return expression_Evaluate( e.children[0] ) * expression_Evaluate( e.children[1] );
        case NUMBER:
            return parseInt( e.value );
    }
}
function expression_ToNode( e )
{
    switch ( e.id )
    {
        case NUMBER:
            return { id: `${NUMBER}-${e.value}`, label: e.value };
        case VARIABLE:
            return { id: `${VARIABLE}-${e.value}`, label: e.value };
        case ADDITION:
            const addArr = [];
            addArr.push( { id: `${ADDITION}-${e.value}`, label: e.value } );
            addArr.push( expression_ToNode( e.children[0]) );
            addArr.push( expression_ToNode( e.children[1]) );
            return addArr;
        case MULTIPLICATION:
            const mulArr = [];
            mulArr.push( { id: `${ADDITION}-${e.value}`, label: e.value } );
            mulArr.push( expression_ToNode( e.children[0]) );
            mulArr.push( expression_ToNode( e.children[1]) );
            return mulArr;
        case DECLARATION:
            const declArr = [];
            return [
                { id: `${DECLARATION}1-${e.children[0]}`, label: `${e.children[0]}` },
                { id: `${DECLARATION}2-${e.children[1]}`, label: `${e.children[1]}` },
                { id: `${DECLARATION}3-${e.children[2]}`, label: `${e.children[2]}` },
            ];
    }
}
for ( let i = 0; i < program.length; i++ )
{
    const expression = program[i];
    const exprStr = expression_ToString( expression );
    const exprEval = expression_Evaluate( expression );
    console.log( `${exprStr} = ${exprEval}` );

    const exprNode = expression_ToNode( expression );
    // console.log( exprNode );
}