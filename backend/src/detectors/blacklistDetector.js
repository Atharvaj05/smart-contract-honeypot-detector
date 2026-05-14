import { traverseAST }
from "../utils/astHelpers.js";

const suspiciousKeywords = [
    "blacklist",
    "blocked",
    "ban",
    "deny",
    "bot"
];

export function detectBlacklist(ast) {

    const findings = [];

    traverseAST(ast, (node) => {

        if (
            node.type === "StateVariableDeclaration"
        ) {

            for (const variable of node.variables || []) {

                const variableName =
                    variable.name?.toLowerCase();

                if (!variableName) continue;

                for (const keyword of suspiciousKeywords) {

                    if (
                        variableName.includes(keyword)
                    ) {

                        findings.push({

                            type: "Blacklist",

                            severity: "HIGH",

                            message:
                                `Suspicious blacklist variable detected: ${variable.name}`,

                            line:
                                node.loc?.start?.line

                        });

                    }

                }

            }

        }

    });

    return findings;

}