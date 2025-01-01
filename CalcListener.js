import antlr4 from 'antlr4';
import CalcLexer from './gen/CalcLexer.js';
import CalcParser from './gen/CalcParser.js';
import CalcListener from './gen/CalcListener.js';

class CalcEvaluator extends CalcListener {
    constructor() {
        super();
        this.stack = [];
    }

    exitExpr(ctx) {
        if (ctx.getChildCount() === 3) {
            const right = this.stack.pop();
            const left = this.stack.pop();
            const op = ctx.getChild(1).getText();
            if (op === '+') {
                this.stack.push(left + right);
            } else if (op === '-') {
                this.stack.push(left - right);
            }
        }
    }

    exitTerm(ctx) {
        if (ctx.getChildCount() === 3) {
            const right = this.stack.pop();
            const left = this.stack.pop();
            const op = ctx.getChild(1).getText();
            if (op === '*') {
                this.stack.push(left * right);
            } else if (op === '/') {
                this.stack.push(left / right);
            }
        }
    }

    exitFactor(ctx) {
        if (ctx.getChildCount() === 1) {
            this.stack.push(parseFloat(ctx.getText()));
        } else if (ctx.getChildCount() === 2) {
            this.stack.push(-this.stack.pop());
        }
    }

    getValue() {
        return this.stack[0];
    }
}

function evaluate(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new CalcLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new CalcParser(tokens);
    const tree = parser.expr();

    const evaluator = new CalcEvaluator();
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(evaluator, tree);

    return evaluator.getValue();
}

// Example usage
// const input = "3 + 5 * (2 - 8)";
const input = "(1+2)*2";
const result = evaluate(input);
console.log(`Result: ${result}`);
