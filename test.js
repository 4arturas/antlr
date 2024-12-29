import antlr4 from 'antlr4';
import todoLexer from "./gen/todoLexer.js";
import todoParser from "./gen/todoParser.js";

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
// console.log("Parsed: " + tree);
updateTree(tree, parser.ruleNames);

function updateTree(tree, ruleNames) {
    for (var i = 0; i < tree.children.length; i++) {
        var child = tree.children[i];
        var nodeType = ruleNames[child.ruleIndex];
        if (nodeType === "element") {
            var newElementText = child.children[2].getText();
            console.log(newElementText);
        }
    }
}
