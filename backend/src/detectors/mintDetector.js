import parser from 'solidity-parser-antlr';
import { createFinding } from '../utils/findings.js';

export const detectMint = (ast) => {
    const findings = [];
    parser.visit(ast, {
        FunctionDefinition(node) {
            // Ignore the constructor
            if (node.isConstructor) return;

            const text = JSON.stringify(node);
            // Look for patterns that modify totalSupply or minting keywords
            if (text.includes('totalSupply') && (text.includes('+=') || text.includes('='))) {
                findings.push(createFinding(
                    'HIDDEN_MINT',
                    `Function "${node.name}" modifies totalSupply outside constructor. This could allow the owner to inflate supply.`,
                    'CRITICAL',
                    0.95
                ));
            }
        }
    });
    return findings;
};