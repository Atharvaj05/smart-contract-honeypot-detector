import fs from 'fs';
import path from 'path';
import { parseAST } from "./astParser.js";
import { analyzeContract } from "./analyzer.js";

/**
 * Orchestrates the full scan from a file path
 */
export async function runFullScan(filePath) {
    try {
        const absolutePath = path.isAbsolute(filePath) 
            ? filePath 
            : path.resolve(process.cwd(), filePath);

        if (!fs.existsSync(absolutePath)) {
            throw new Error(`File not found: ${absolutePath}`);
        }

        const sourceCode = fs.readFileSync(absolutePath, 'utf8');
        const ast = parseAST(sourceCode);
        
        // Use the unified analyzer
        return analyzeContract(ast);
    } catch (error) {
        throw new Error(`Scan Engine Failed: ${error.message}`);
    }
}

/**
 * Direct scan for raw AST (used by Controller)
 */
export function scanContract(ast) {
    return analyzeContract(ast);
}