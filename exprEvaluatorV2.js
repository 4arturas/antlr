import antlr4 from 'antlr4';
import ExprLexer from "./gen/ExprLexer.js";
import ExprParser from "./gen/ExprParser.js";
import ExprVisitor from "./gen/ExprVisitor.js";

// Constants for node types
const MULTIPLICATION = 'MULTIPLICATION';
const ADDITION = 'ADDITION';
const VARIABLE = 'VARIABLE';
const NUMBER = 'NUMBER';

// Unique ID generator
let idCounter = 1;

// Function to create a unique ID
function generateId() {
    return `node${idCounter++}`;
}

// Function to create a node
function createNode(id, x, y, label) {
    return { id, x, y, label };
}

// Function to create an edge
function createEdge(source, target, label) {
    return { source, target, label };
}

class ExprGraphBuilder extends ExprVisitor {
    constructor() {
        super();
        this.nodes = [];
        this.edges = [];
        this.nodeMap = new Map(); // To store nodes by their IDs
    }

    // Visit a parse tree produced by ExprParser#Program.
    visitProgram(ctx) {
        return this.visitChildren(ctx);
    }

    // Visit a parse tree produced by ExprParser#Multiplication.
    visitMultiplication(ctx) {
        const left = this.visit(ctx.getChild(0));
        const right = this.visit(ctx.getChild(2));

        // Create a new node for the multiplication operation
        const opId = generateId();
        const opNode = createNode(opId, 200, 100, '*');
        this.nodes.push(opNode);

        // Add edges connecting the operands to the operator
        this.edges.push(createEdge(left.id, opId, 'left'));
        this.edges.push(createEdge(right.id, opId, 'right'));

        // Store the operator node in the map
        this.nodeMap.set(opId, opNode);

        return { id: opId, type: MULTIPLICATION };
    }

    // Visit a parse tree produced by ExprParser#Addition.
    visitAddition(ctx) {
        const left = this.visit(ctx.getChild(0));
        const right = this.visit(ctx.getChild(2));

        // Create a new node for the addition operation
        const opId = generateId();
        const opNode = createNode(opId, 200, 100, '+');
        this.nodes.push(opNode);

        // Add edges connecting the operands to the operator
        this.edges.push(createEdge(left.id, opId, 'left'));
        this.edges.push(createEdge(right.id, opId, 'right'));

        // Store the operator node in the map
        this.nodeMap.set(opId, opNode);

        return { id: opId, type: ADDITION };
    }

    // Visit a parse tree produced by ExprParser#Variable.
    visitVariable(ctx) {
        const VAR = ctx.VAR().getText();

        // Create a node for the variable
        const varId = generateId();
        const varNode = createNode(varId, 100, 200, VAR);
        this.nodes.push(varNode);

        // Store the variable node in the map
        this.nodeMap.set(varId, varNode);

        return { id: varId, type: VARIABLE };
    }

    // Visit a parse tree produced by ExprParser#Number.
    visitNumber(ctx) {
        const NUM = ctx.NUM().getText();

        // Create a node for the number
        const numId = generateId();
        const numNode = createNode(numId, 100, 200, NUM);
        this.nodes.push(numNode);

        // Store the number node in the map
        this.nodeMap.set(numId, numNode);

        return { id: numId, type: NUMBER };
    }
}

// Input program
const input = `
INT i = 5
INT j = 7
i + j * 3
`;

// Evaluate the input program
function evaluate(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new ExprLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new ExprParser(tokens);
    const tree = parser.prog();
    const graphBuilder = new ExprGraphBuilder();
    graphBuilder.visit(tree);
    return {
        nodes: graphBuilder.nodes,
        edges: graphBuilder.edges
    };
}

// Execute the evaluation
const graph = evaluate(input);

// Print the resulting graph structure
console.log(JSON.stringify(graph, null, 2));