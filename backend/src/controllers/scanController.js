import { parseSolidity }
from "../services/astParser.js";

import { analyzeContract }
from "../services/analyzer.js";

export async function scanContract(req, res) {

    try {

        const { sourceCode } = req.body;

        if (!sourceCode) {

            return res.status(400).json({
                success: false,
                error: "Missing sourceCode"
            });

        }

        /*
            Parse AST
        */

        const ast =
            parseSolidity(sourceCode);

        /*
            Analyze Contract
        */

        const findings =
            analyzeContract(ast);

        return res.json({

            success: true,

            findings

        });

    } catch (err) {

        return res.status(500).json({

            success: false,

            error: err.message

        });

    }

}