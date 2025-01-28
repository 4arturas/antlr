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

class ExprEvaluatorV2 extends ExprVisitor
{
    constructor() {
        super();
        this.mapValues = {};
        this.expressions = [];
    }
    // Visit a parse tree produced by ExprTrintiParser#Multiplication.
    visitMultiplication(ctx)
    {
        const left = this.visit(ctx.getChild(0));
        const right = this.visit(ctx.getChild(2));
        return create_Node( MULTIPLICATION, '*', [left, right] );
    }


    // Visit a parse tree produced by ExprTrintiParser#Addition.
    visitAddition(ctx) {
        const left = this.visit(ctx.getChild(0));
        const right = this.visit(ctx.getChild(2));
        return create_Node( ADDITION, '+', [left, right] );
    }


    // Visit a parse tree produced by ExprTrintiParser#Variable.
    visitVariable(ctx)
    {
        const id = ctx.ID().getText();
        return create_Node( VARIABLE, id );
    }


    // Visit a parse tree produced by ExprTrintiParser#Number.
    visitNumber(ctx)
    {
        const numText = ctx.NUM().getText();
        // const numText = ctx.getChild(0).getText();
        return create_Node( NUMBER, parseInt(numText) );

    }


    // Visit a parse tree produced by ExprTrintiParser#Declaration.
    visitDeclaration(ctx)
    {
        const variableName = ctx.getChild( 0 ).getText();
        const type = ctx.getChild( 2 ).getText();
        const value = ctx.NUM().getText();
        const node = create_Node( DECLARATION, value );
        this.mapValues[variableName] = value;
        return node;
    }

    evaluateExpression( expression )
    {
        let result = 0;
        switch ( expression.id )
        {
            case VARIABLE:
                const id = expression.value;
                result = parseInt( this.mapValues[id] );
                break;
            case NUMBER:
                result = expression.value;
                break;
            case ADDITION:
                const left = this.evaluateExpression( expression.children[0] );
                const right = this.evaluateExpression( expression.children[1] );
                result = left + right;
                break;
            case MULTIPLICATION:
                const leftMul = this.evaluateExpression( expression.children[0] );
                const rightMul = this.evaluateExpression( expression.children[1] );
                result = leftMul * rightMul;
                break;
        }
        return result;
    }

    expressionToString( expression )
    {
        switch ( expression.id )
        {
            case PROGRAM:
                return PROGRAM + ' undefined';
            case DECLARATION:
                return DECLARATION + ' undefined';
            case VARIABLE:
                return expression.value;
            case NUMBER:
                return expression.value;
            case ADDITION:
                return `${this.expressionToString( expression.children[0] )} + ${this.expressionToString( expression.children[1] )}`;
            case MULTIPLICATION:
                return `${this.expressionToString( expression.children[0] )} * ${this.expressionToString( expression.children[1] )}`;
        }
    }

    // Visit a parse tree produced by ExprTrintiParser#Program.
    visitProgram(ctx)
    {
        for ( let i = 0; i < ctx.getChildCount()-1; i++ )
        {
            const expression = this.visit( ctx.getChild( i ) );
            this.expressions.push(expression);
        }
        for ( let i = 0; i < this.expressions.length; i++ )
        {
            const expression = this.expressions[i];
            if ( expression.id !== DECLARATION )
            {
                const result = this.evaluateExpression( expression );
                const input = this.expressionToString( expression );
                console.log( `${input} = ${result}` );
            }
        }
        return this.visitChildren(ctx);
    }
}

function evaluate( input )
{
    const chars = new antlr4.InputStream( input );
    const lexer = new ExprLexer( chars );
    const tokens = new antlr4.CommonTokenStream( lexer );
    const parser = new ExprParser( tokens );
    const tree = parser.prog();

    const evaluator = new ExprEvaluatorV2();
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

evaluate( input );