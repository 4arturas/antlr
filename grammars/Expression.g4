grammar Expression;

program
    : statement+ EOF
    ;

statement
    : assignment
    | functionCall
    | expression ';'
    ;

assignment
    : type identifier '=' expression ';'
    ;

functionCall
    : 'print' '(' expression ')' ';'
    ;

expression
    : term (addOp term)*
    ;

term
    : factor (mulOp factor)*
    ;

factor
    : primary (relOp primary)?
    ;

primary
    : number
    | identifier
    | '(' expression ')'
    ;

addOp
    : '+' | '-'
    ;

mulOp
    : '*' | '/'
    ;

relOp
    : '>' | '<' | '>=' | '<=' | '==' | '!='
    ;

type
    : 'numeric' | 'bool'
    ;

identifier
    : LETTER (LETTER | DIGIT)*
    ;

number
    : DIGIT+
    ;

LETTER
    : [a-zA-Z]
    ;

DIGIT
    : [0-9]
    ;

WS
    : [ \t\n\r]+ -> skip
    ;
