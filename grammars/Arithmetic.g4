grammar Arithmetic;

// Parser Rules
expr: expr op=('*'|'/') expr    # MulDivExpr
    | expr op=('+'|'-') expr    # AddSubExpr
    | '(' expr ')'              # ParenExpr
    | NUMBER                    # NumberExpr
    ;

// Lexer Rules
NUMBER : [0-9]+ ('.' [0-9]+)? ;
WS     : [ \t\r\n]+ -> skip ;