import { createFinding } from "../utils/findings.js";

export function detectRequireRisks(ast) {
  const findings = [];

  function visit(node) {
    if (!node) return;

    if (
      node.type === "FunctionCall" &&
      node.expression?.name === "require"
    ) {
      const condition = JSON.stringify(node.arguments);

      if (
        condition.includes("block") ||
        condition.includes("time") ||
        condition.includes("balance")
      ) {
        findings.push(
          createFinding({
            type: "REQUIRE_RISK",
            severity: "MEDIUM",
            message: "Conditional require-based restriction detected",
            location: node.src
          })
        );
      }
    }

    for (let k in node) visit(node[k]);
  }

  visit(ast);
  return findings;
}