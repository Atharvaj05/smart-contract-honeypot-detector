import { parseAST } from "../services/astParser.js";
import { analyzeContract } from "../services/analyzer.js";
import { fetchContractSource } from "../services/contractFetcher.js";

export async function scanContract(req, res) {
  try {
    const { sourceCode, address } = req.body;
    let codeToAnalyze = sourceCode;

    if (address && address.startsWith('0x')) {
      try {
        const fetched = await fetchContractSource(address);
        codeToAnalyze = fetched.sourceCode;
      } catch (fetchErr) {
        return res.status(400).json({ success: false, error: fetchErr.message });
      }
    }

    if (!codeToAnalyze || codeToAnalyze.trim() === "") {
      return res.status(400).json({ success: false, error: "No code provided." });
    }

    const ast = parseAST(codeToAnalyze);
    const result = analyzeContract(ast);

    // Ensure we send a consistent structure
    res.json({
      success: true,
      securityScore: result.securityScore || 0,
      riskLevel: result.riskLevel || "UNKNOWN",
      findings: Array.isArray(result.findings) ? result.findings : [],
      summary: result.summary || {}
    });

  } catch (err) {
    console.error("Scan Error:", err);
    res.status(500).json({ success: false, error: "Engine error: " + err.message });
  }
}