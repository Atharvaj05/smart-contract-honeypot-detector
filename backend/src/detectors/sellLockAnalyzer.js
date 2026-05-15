import { createFinding } from "../utils/findings.js";

// Renamed to match the import in analyzer.js
export function detectSellLock(ast) {
  const findings = [];

  function visit(node) {
    if (!node || typeof node !== "object") return;

    const text = JSON.stringify(node);

    // Detect sell-block patterns
    if (text.includes("require") && (text.includes("block.timestamp") || text.includes("swap"))) {
      findings.push(
        // Updated to use the correct arguments instead of an object
        createFinding(
          "SELL_LOCK",
          "Possible sell restriction or time-based lock detected.",
          "CRITICAL",
          0.85
        )
      );
    }

    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        visit(node[key]);
      }
    }
  }

  visit(ast);
  return findings;
}