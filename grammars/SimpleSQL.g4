grammar SimpleSQL;

column_name: IDENTIFIER;

table: IDENTIFIER;

aggregation_function
    : SUM | COUNT;

comparison_operator
    : '=' | '<>' | '<' | '>' | '<=' | '>=';

logical_operator
    : AND | OR;

value
    : NUMBER
    | STRING
    | IDENTIFIER
    ;

column_expr: column_name | aggregation_function '(' column_name ')';

column_list : '*' | column_expr (',' column_expr)*;

condition: column_name comparison_operator value | '(' condition ')' (logical_operator condition)*;

where_clause
    : WHERE condition;

group_by_clause
    : GROUP BY column_name (',' column_name)*;

select_statement
    : SELECT column_list FROM table (where_clause)? (group_by_clause)?;

sql: select_statement;

// Lexer rules
SELECT: 'SELECT';
FROM: 'FROM';
WHERE: 'WHERE';
GROUP: 'GROUP';
BY: 'BY';
SUM: 'SUM';
COUNT: 'COUNT';
AND: 'AND';
OR: 'OR';

IDENTIFIER: [a-zA-Z_][a-zA-Z0-9_]*;
NUMBER: '-'? [0-9]+ ('.' [0-9]+)?;
STRING: '\'' ~'\''* '\'';
WS: [ \t\r\n]+ -> skip;