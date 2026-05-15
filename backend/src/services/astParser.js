import parser from 'solidity-parser-antlr';

export function parseAST(sourceCode) {
    try {
        // We parse with 'loc' enabled to potentially show line numbers in the UI
        const ast = parser.parse(sourceCode, { loc: true, range: true });
        return ast;
    } catch (e) {
        console.error("AST Parsing Error:", e);
        throw new Error("Syntax error in Solidity code. Please check your contract.");
    }
}