grammar todo;

CONTENT
    : [a-zA-Z0-9_][a-zA-Z0-9_ \t]*
    ;

emptyLine
    : NL
    ;

NL
    : '\r' | '\n'
    ;

element
    : '*' ( ' ' | '\t' )* CONTENT NL+
    ;

elements
    : (element|emptyLine)* EOF
    ;    