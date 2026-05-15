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

export function isFunctionCall(node, name) {
  return (
    node.type === "FunctionCall" &&
    node.expression?.name === name
  );
}
export function isRequireStatement(node) {
  return (
    node.type === "FunctionCall" &&
    node.expression?.name === "require"
  );
}
export function hasModifier(node, modifierName) {
  return node.modifiers?.some(m => m.name === modifierName);
}
export function isStateWrite(node) {
  return (
    node.type === "Assignment" ||
    (node.type === "UnaryOperation" && node.operator === "++")
  );
}