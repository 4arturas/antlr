// Generated from C:/Users/4artu/IdeaProjects/antlr/grammars/CalcLexer.g4 by ANTLR 4.13.2
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue", "this-escape"})
public class CalcLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.13.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		WS=1, NL=2, INPUT_KW=3, OUTPUT_KW=4, NUMBER_LIT=5, ID=6, LPAREN=7, RPAREN=8, 
		EQUAL=9, MINUS=10, PLUS=11, MUL=12, DIV=13, UNRECOGNIZED=14;
	public static final int
		WS_CHANNEL=2;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN", "WS_CHANNEL"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"WS", "NL", "INPUT_KW", "OUTPUT_KW", "NUMBER_LIT", "ID", "LPAREN", "RPAREN", 
			"EQUAL", "MINUS", "PLUS", "MUL", "DIV", "UNRECOGNIZED"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, "'input'", "'output'", null, null, "'('", "')'", "'='", 
			"'-'", "'+'", "'*'", "'/'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "WS", "NL", "INPUT_KW", "OUTPUT_KW", "NUMBER_LIT", "ID", "LPAREN", 
			"RPAREN", "EQUAL", "MINUS", "PLUS", "MUL", "DIV", "UNRECOGNIZED"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public CalcLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "CalcLexer.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\u0004\u0000\u000ea\u0006\uffff\uffff\u0002\u0000\u0007\u0000\u0002\u0001"+
		"\u0007\u0001\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004"+
		"\u0007\u0004\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007"+
		"\u0007\u0007\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b"+
		"\u0007\u000b\u0002\f\u0007\f\u0002\r\u0007\r\u0001\u0000\u0004\u0000\u001f"+
		"\b\u0000\u000b\u0000\f\u0000 \u0001\u0000\u0001\u0000\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0003\u0001(\b\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001\u0002\u0001"+
		"\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001\u0003\u0001"+
		"\u0003\u0001\u0004\u0001\u0004\u0001\u0004\u0005\u0004<\b\u0004\n\u0004"+
		"\f\u0004?\t\u0004\u0003\u0004A\b\u0004\u0001\u0004\u0001\u0004\u0004\u0004"+
		"E\b\u0004\u000b\u0004\f\u0004F\u0003\u0004I\b\u0004\u0001\u0005\u0001"+
		"\u0005\u0005\u0005M\b\u0005\n\u0005\f\u0005P\t\u0005\u0001\u0006\u0001"+
		"\u0006\u0001\u0007\u0001\u0007\u0001\b\u0001\b\u0001\t\u0001\t\u0001\n"+
		"\u0001\n\u0001\u000b\u0001\u000b\u0001\f\u0001\f\u0001\r\u0001\r\u0000"+
		"\u0000\u000e\u0001\u0001\u0003\u0002\u0005\u0003\u0007\u0004\t\u0005\u000b"+
		"\u0006\r\u0007\u000f\b\u0011\t\u0013\n\u0015\u000b\u0017\f\u0019\r\u001b"+
		"\u000e\u0001\u0000\u0006\u0002\u0000  tt\u0002\u0000nnrr\u0001\u00001"+
		"9\u0001\u000009\u0002\u0000AZaz\u0004\u000009AZ__azg\u0000\u0001\u0001"+
		"\u0000\u0000\u0000\u0000\u0003\u0001\u0000\u0000\u0000\u0000\u0005\u0001"+
		"\u0000\u0000\u0000\u0000\u0007\u0001\u0000\u0000\u0000\u0000\t\u0001\u0000"+
		"\u0000\u0000\u0000\u000b\u0001\u0000\u0000\u0000\u0000\r\u0001\u0000\u0000"+
		"\u0000\u0000\u000f\u0001\u0000\u0000\u0000\u0000\u0011\u0001\u0000\u0000"+
		"\u0000\u0000\u0013\u0001\u0000\u0000\u0000\u0000\u0015\u0001\u0000\u0000"+
		"\u0000\u0000\u0017\u0001\u0000\u0000\u0000\u0000\u0019\u0001\u0000\u0000"+
		"\u0000\u0000\u001b\u0001\u0000\u0000\u0000\u0001\u001e\u0001\u0000\u0000"+
		"\u0000\u0003\'\u0001\u0000\u0000\u0000\u0005+\u0001\u0000\u0000\u0000"+
		"\u00071\u0001\u0000\u0000\u0000\t@\u0001\u0000\u0000\u0000\u000bJ\u0001"+
		"\u0000\u0000\u0000\rQ\u0001\u0000\u0000\u0000\u000fS\u0001\u0000\u0000"+
		"\u0000\u0011U\u0001\u0000\u0000\u0000\u0013W\u0001\u0000\u0000\u0000\u0015"+
		"Y\u0001\u0000\u0000\u0000\u0017[\u0001\u0000\u0000\u0000\u0019]\u0001"+
		"\u0000\u0000\u0000\u001b_\u0001\u0000\u0000\u0000\u001d\u001f\u0007\u0000"+
		"\u0000\u0000\u001e\u001d\u0001\u0000\u0000\u0000\u001f \u0001\u0000\u0000"+
		"\u0000 \u001e\u0001\u0000\u0000\u0000 !\u0001\u0000\u0000\u0000!\"\u0001"+
		"\u0000\u0000\u0000\"#\u0006\u0000\u0000\u0000#\u0002\u0001\u0000\u0000"+
		"\u0000$%\u0005r\u0000\u0000%(\u0005n\u0000\u0000&(\u0007\u0001\u0000\u0000"+
		"\'$\u0001\u0000\u0000\u0000\'&\u0001\u0000\u0000\u0000()\u0001\u0000\u0000"+
		"\u0000)*\u0006\u0001\u0000\u0000*\u0004\u0001\u0000\u0000\u0000+,\u0005"+
		"i\u0000\u0000,-\u0005n\u0000\u0000-.\u0005p\u0000\u0000./\u0005u\u0000"+
		"\u0000/0\u0005t\u0000\u00000\u0006\u0001\u0000\u0000\u000012\u0005o\u0000"+
		"\u000023\u0005u\u0000\u000034\u0005t\u0000\u000045\u0005p\u0000\u0000"+
		"56\u0005u\u0000\u000067\u0005t\u0000\u00007\b\u0001\u0000\u0000\u0000"+
		"8A\u00050\u0000\u00009=\u0007\u0002\u0000\u0000:<\u0007\u0003\u0000\u0000"+
		";:\u0001\u0000\u0000\u0000<?\u0001\u0000\u0000\u0000=;\u0001\u0000\u0000"+
		"\u0000=>\u0001\u0000\u0000\u0000>A\u0001\u0000\u0000\u0000?=\u0001\u0000"+
		"\u0000\u0000@8\u0001\u0000\u0000\u0000@9\u0001\u0000\u0000\u0000AH\u0001"+
		"\u0000\u0000\u0000BD\u0005.\u0000\u0000CE\u0007\u0003\u0000\u0000DC\u0001"+
		"\u0000\u0000\u0000EF\u0001\u0000\u0000\u0000FD\u0001\u0000\u0000\u0000"+
		"FG\u0001\u0000\u0000\u0000GI\u0001\u0000\u0000\u0000HB\u0001\u0000\u0000"+
		"\u0000HI\u0001\u0000\u0000\u0000I\n\u0001\u0000\u0000\u0000JN\u0007\u0004"+
		"\u0000\u0000KM\u0007\u0005\u0000\u0000LK\u0001\u0000\u0000\u0000MP\u0001"+
		"\u0000\u0000\u0000NL\u0001\u0000\u0000\u0000NO\u0001\u0000\u0000\u0000"+
		"O\f\u0001\u0000\u0000\u0000PN\u0001\u0000\u0000\u0000QR\u0005(\u0000\u0000"+
		"R\u000e\u0001\u0000\u0000\u0000ST\u0005)\u0000\u0000T\u0010\u0001\u0000"+
		"\u0000\u0000UV\u0005=\u0000\u0000V\u0012\u0001\u0000\u0000\u0000WX\u0005"+
		"-\u0000\u0000X\u0014\u0001\u0000\u0000\u0000YZ\u0005+\u0000\u0000Z\u0016"+
		"\u0001\u0000\u0000\u0000[\\\u0005*\u0000\u0000\\\u0018\u0001\u0000\u0000"+
		"\u0000]^\u0005/\u0000\u0000^\u001a\u0001\u0000\u0000\u0000_`\t\u0000\u0000"+
		"\u0000`\u001c\u0001\u0000\u0000\u0000\b\u0000 \'=@FHN\u0001\u0000\u0002"+
		"\u0000";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}