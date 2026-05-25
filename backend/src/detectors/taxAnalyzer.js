import { createFinding } from "../utils/findings.js";
import parser from "@solidity-parser/parser";

export function detectHighTax(ast) {
  const findings = [];
  const suspiciousKeywords = /fee|tax|commission|basisPoints|limit|maxTransfer/gi;

  parser.visit(ast, {
    // Detect hardcoded limits in transfers (e.g., amount < 1 ether)
    BinaryOperation(node) {
      if (node.operator === "<" || node.operator === "<=") {
        const left = JSON.stringify(node.left);
        const right = JSON.stringify(node.right);
        
        if (left.includes("amount") || right.includes("ether")) {
          findings.push(createFinding({
            type: "TRANSFER_LIMIT",
            severity: "HIGH",
            message: "Hardcoded transfer limit detected. This is a common honeypot technique to prevent large sells.",
            location: node.loc
          }));
        }
      }
    },

    StateVariableDeclaration(node) {
      node.variables.forEach((variable) => {
        if (suspiciousKeywords.test(variable.name)) {
          findings.push(createFinding({
            type: "SUSPICIOUS_VARIABLE",
            severity: "MEDIUM",
            message: `Variable "${variable.name}" detected. May be used to manipulate taxes or limits.`,
            location: node.loc
          }));
        }
      });
    }
  });

  return findings;
}