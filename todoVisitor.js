import antlr4 from 'antlr4';
import todoLexer from "./gen/todoLexer.js";
import todoParser from "./gen/todoParser.js";
import todoVisitor from "./gen/todoVisitor.js";

const input = `
* do this
* do that

* do something else after an empty line
    `;

const chars = new antlr4.InputStream(input);
const lexer = new todoLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new todoParser(tokens);
parser.buildParseTrees = true;
const tree = parser.elements();

// Extend the todoVisitor class
class CustomTodoVisitor extends todoVisitor {
    visitElement(ctx) {
        // Custom action for visiting an element
        const content = ctx.CONTENT().getText();
        console.log(`Element content: ${content}`);
        return this.visitChildren(ctx);
    }

    visitEmptyLine(ctx) {
        // Custom action for visiting an empty line
        console.log("Empty line encountered");
        return this.visitChildren(ctx);
    }

    visitElements(ctx) {
        // Custom action for visiting the elements
        console.log("Visiting elements");
        return this.visitChildren(ctx);
    }
}

// Create an instance of the custom visitor
const visitor = new CustomTodoVisitor();

// Use the visitor to visit the parse tree
visitor.visit(tree);
