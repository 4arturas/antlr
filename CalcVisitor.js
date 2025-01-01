import antlr4 from 'antlr4';
import CalcLexer from './gen/CalcLexer.js';
import CalcParser from './gen/CalcParser.js';
import CalcVisitor from './gen/CalcVisitor.js';

class CalcEvaluator extends CalcVisitor {
    constructor() {
        super();
        this.stack = [];
    }

    visitExpr(ctx) {
        if (ctx.getChildCount() === 3) {
            const right = this.visit(ctx.getChild(2));
            const left = this.visit(ctx.getChild(0));
            const op = ctx.getChild(1).getText();
            if (op === '+') {
                return left + right;
            } else if (op === '-') {
                return left - right;
            }
        } else {
            return this.visit(ctx.getChild(0));
        }
    }

    visitTerm(ctx) {
        if (ctx.getChildCount() === 3) {
            const right = this.visit(ctx.getChild(2));
            const left = this.visit(ctx.getChild(0));
            const op = ctx.getChild(1).getText();
            if (op === '*') {
                return left * right;
            } else if (op === '/') {
                return left / right;
            }
        } else {
            return this.visit(ctx.getChild(0));
        }
    }

    visitFactor(ctx) {
        if (ctx.getChildCount() === 1) {
            return parseFloat(ctx.getText());
        } else if (ctx.getChildCount() === 2) {
            const value = this.visit(ctx.getChild(1));
            return ctx.getChild(0).getText() === '-' ? -value : value;
        } else {
            return this.visit(ctx.getChild(1));
        }
    }
}

function evaluate(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new CalcLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new CalcParser(tokens);
    const tree = parser.expr();

    const evaluator = new CalcEvaluator();
    return evaluator.visit(tree);
}

// Example usage
// const input = "3 + 5 * (2 - 8)";
const input = "(1+2)*2";
const result = evaluate(input);
console.log(`Result: ${result}`);
