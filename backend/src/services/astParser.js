import parser from "@solidity-parser/parser";

export function parseAST(sourceCode) {
  try {
    // tolerant: true allows the parser to continue even if it hits a syntax error
    const ast = parser.parse(sourceCode, { 
      loc: true, 
      range: true, 
      tolerant: true 
    });

    // If the parser collected errors but still produced an AST
    if (ast.errors && ast.errors.length > 0) {
      console.warn("Parser encountered minor syntax issues:", ast.errors);
    }

    return ast;
  } catch (error) {
    console.error("Critical Parser Error:", error);
    // Provide a detailed error message back to the frontend
    throw new Error(`Solidity Syntax Error: ${error.message} at line ${error.loc?.line || 'unknown'}`);
  }
}