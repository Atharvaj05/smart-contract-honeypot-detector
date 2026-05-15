import { parseAST } from '../services/astParser.js';
import { analyzeContract } from '../services/analyzer.js';

export const scanContract = async (req, res) => {
    try {
        const { sourceCode } = req.body;

        if (!sourceCode) {
            return res.status(400).json({ success: false, error: "No code provided" });
        }

        // 1. Generate AST
        const ast = parseAST(sourceCode);

        // 2. Run Comprehensive Analysis
        const report = analyzeContract(ast);

        return res.status(200).json(report);

    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: "Analysis Failed", 
            message: error.message 
        });
    }
};