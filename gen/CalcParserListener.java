// Generated from C:/Users/4artu/IdeaProjects/antlr/grammars/CalcParser.g4 by ANTLR 4.13.2
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link CalcParser}.
 */
public interface CalcParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link CalcParser#compilationUnit}.
	 * @param ctx the parse tree
	 */
	void enterCompilationUnit(CalcParser.CompilationUnitContext ctx);
	/**
	 * Exit a parse tree produced by {@link CalcParser#compilationUnit}.
	 * @param ctx the parse tree
	 */
	void exitCompilationUnit(CalcParser.CompilationUnitContext ctx);
	/**
	 * Enter a parse tree produced by {@link CalcParser#input}.
	 * @param ctx the parse tree
	 */
	void enterInput(CalcParser.InputContext ctx);
	/**
	 * Exit a parse tree produced by {@link CalcParser#input}.
	 * @param ctx the parse tree
	 */
	void exitInput(CalcParser.InputContext ctx);
	/**
	 * Enter a parse tree produced by {@link CalcParser#output}.
	 * @param ctx the parse tree
	 */
	void enterOutput(CalcParser.OutputContext ctx);
	/**
	 * Exit a parse tree produced by {@link CalcParser#output}.
	 * @param ctx the parse tree
	 */
	void exitOutput(CalcParser.OutputContext ctx);
	/**
	 * Enter a parse tree produced by {@link CalcParser#calc}.
	 * @param ctx the parse tree
	 */
	void enterCalc(CalcParser.CalcContext ctx);
	/**
	 * Exit a parse tree produced by {@link CalcParser#calc}.
	 * @param ctx the parse tree
	 */
	void exitCalc(CalcParser.CalcContext ctx);
	/**
	 * Enter a parse tree produced by {@link CalcParser#expression}.
	 * @param ctx the parse tree
	 */
	void enterExpression(CalcParser.ExpressionContext ctx);
	/**
	 * Exit a parse tree produced by {@link CalcParser#expression}.
	 * @param ctx the parse tree
	 */
	void exitExpression(CalcParser.ExpressionContext ctx);
}