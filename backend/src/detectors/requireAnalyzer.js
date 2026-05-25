import { createFinding } from "../utils/findings.js";
import parser from "@solidity-parser/parser";

export function detectRequireRisks(ast) {
  const findings = [];

  parser.visit(ast, {
    FunctionCall(node) {
      if (node.expression.type === "Identifier" && node.expression.name === "require") {
        const condition = JSON.stringify(node.arguments[0]);

        if (condition.includes("msg.sender") && (condition.includes("owner") || condition.includes("blacklisted"))) {
          findings.push(createFinding({
            type: "RESTRICTIVE_REQUIRE",
            severity: "HIGH",
            message: "Requirement found that restricts transfers based on sender identity or blacklist status.",
            location: node.loc
          }));
        }
      }
    }
  });

  return findings;
}