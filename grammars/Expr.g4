grammar Expr;

@header {
//    package antlr;
}

 // Start Variable
 prog:  (decl | expr)+ EOF          # Program
     ;
decl: INT_TYPE ID '=' NUM           # Declaration
    ;

expr: expr '*' expr                 # Multiplication
    | expr '+' expr                 # Addition
    | ID                            # Variable
    | NUM                           # Number
    ;

/* Tokens */
ID: [a-z][a-zA-Z_]*;
NUM: '0' | '-'?[1-9][0-9]*;
INT_TYPE: 'INT';
COMMENT: '--' ~[\r\n]* -> skip;
WS: [ \t\n]+ -> skip;