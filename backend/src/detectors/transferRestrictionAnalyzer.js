import { createFinding } from "../utils/findings.js";

export function detectTransferRestrictions(ast) {
  const findings = [];

  function visit(node) {
    if (!node) return;

    // Detect transfer/require blocking logic
    if (
      node.type === "IfStatement" &&
      JSON.stringify(node).includes("transfer") &&
      JSON.stringify(node).includes("require")
    ) {
      findings.push(
        createFinding({
          type: "TRANSFER_RESTRICTION",
          severity: "HIGH",
          message: "Conditional transfer restriction detected",
          location: node.src
        })
      );
    }

    for (let key in node) {
      if (typeof node[key] === "object") visit(node[key]);
    }
  }

  visit(ast);
  return findings;
}