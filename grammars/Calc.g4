grammar Calc;

// Lexer rules
NUMBER: [0-9]+ ('.' [0-9]+)?;
WS: [ \t\r\n]+ -> skip;

// Parser rules
factor: NUMBER | '(' expr ')' | ('-' | '+') factor;
term: factor (('*' | '/') factor)*;
expr: term (('+' | '-') term)*;
