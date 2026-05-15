import parser from 'solidity-parser-antlr';
import { createFinding } from '../utils/findings.js';

/**
 * Detects mappings used for blacklisting addresses.
 * Verified to work with solidity-parser-antlr AST structure.
 */
export const detectBlacklist = (ast) => {
    const findings = [];

    parser.visit(ast, {
        VariableDeclaration(node) {
            // 1. Check if the variable type is a Mapping
            if (node.typeName && node.typeName.type === 'Mapping') {
                
                // 2. Check the variable name for suspicious keywords
                const name = node.name ? node.name.toLowerCase() : "";
                
                if (name.includes('black') || name.includes('block') || name.includes('limit')) {
                    findings.push(createFinding(
                        'BLACKLIST_LOGIC',
                        `Suspicious mapping detected: "${node.name}". This is a common pattern in honeypots to prevent specific addresses from selling.`,
                        'HIGH',
                        0.9 // Confidence level
                    ));
                }
            }
        }
    });

    return findings;
};