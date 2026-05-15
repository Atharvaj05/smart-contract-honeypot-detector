process.removeAllListeners('warning');
import { runFullScan } from "./services/scannerEngine.js";
import path from 'path';

async function test() {
    console.log("🚀 Starting Security Engine Test...");
    try {
        // Path to your test contract (ensure this file exists!)
        const contractPath = path.resolve('contracts/testContract.sol');
        const report = await runFullScan(contractPath);

        console.log("\n===== FINAL SCAN RESULT =====");
        console.log(`Security Score: ${report.securityScore}/100`);
        console.log(`Risk Level: ${report.riskLevel}`);
        console.log(`Total Findings: ${report.summary.totalIssues}`);
        
        console.log("\nDetailed Findings:");
        report.findings.forEach((f, i) => {
            console.log(`[${i+1}] ${f.severity} - ${f.type}: ${f.message}`);
        });

    } catch (err) {
        console.error("❌ Test Failed:", err.message);
    }
}

test();