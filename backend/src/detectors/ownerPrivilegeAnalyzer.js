import { createFinding } from "../utils/findings.js";

/**
 * Detects functions restricted to the owner which could be used for honeypot behavior.
 * Renamed to detectOwnerPrivileges to match the imports in analyzer.js
 */
export function detectOwnerPrivileges(ast) {
  const findings = [];

  function visit(node) {
    if (!node || typeof node !== "object") return;

    // Check if this node is a Function Definition
    if (node.type === "FunctionDefinition") {
      const text = JSON.stringify(node);

      // Look for owner-restriction patterns
      if (
        text.includes("onlyOwner") || 
        (text.includes("msg.sender") && text.includes("owner"))
      ) {
        // We only flag it as high risk if it's a sensitive function name
        const isSensitive = /withdraw|emergency|setTax|blacklist|pause/i.test(node.name || "");
        
        findings.push(
          createFinding(
            "OWNER_PRIVILEGE",
            `Function "${node.name || 'unnamed'}" is restricted to owner. ${isSensitive ? "This is a high-risk privilege in this context." : ""}`,
            isSensitive ? "HIGH" : "MEDIUM",
            0.9
          )
        );
      }
    }

    // Continue traversing the tree
    for (const key in node) {
      if (node.hasOwnProperty(key)) {
        visit(node[key]);
      }
    }
  }

  visit(ast);
  return findings;
}