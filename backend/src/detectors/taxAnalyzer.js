import { createFinding } from "../utils/findings.js";

export function detectHighTax(ast) {
  const findings = [];

  function visit(node) {
    if (!node) return;

    const text = JSON.stringify(node);

    const taxMatch = text.match(/fee|tax|commission/gi);

    if (taxMatch && text.includes("uint")) {
      findings.push(
        createFinding({
          type: "HIGH_TAX",
          severity: "MEDIUM",
          message: "Potential dynamic tax/fee system detected",
          location: node.src
        })
      );
    }

    for (let k in node) visit(node[k]);
  }

  visit(ast);
  return findings;
}