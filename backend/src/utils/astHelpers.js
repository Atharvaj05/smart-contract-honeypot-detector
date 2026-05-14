import parser from "solidity-parser-antlr";

export function traverseAST(ast, callback) {

    parser.visit(ast, {

        ContractDefinition(node) {
            callback(node);
        },

        StateVariableDeclaration(node) {
            callback(node);
        },

        FunctionDefinition(node) {
            callback(node);
        },

        ExpressionStatement(node) {
            callback(node);
        },

        FunctionCall(node) {
            callback(node);
        }

    });

}