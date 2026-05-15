import { detectBlacklist } from "../detectors/blacklistDetector.js";
import { detectRequireRisks } from "../detectors/requireAnalyzer.js";
import { detectHighTax } from "../detectors/taxAnalyzer.js";
import { detectSellLock } from "../detectors/sellLockAnalyzer.js";
import { detectTransferRestrictions } from "../detectors/transferRestrictionAnalyzer.js";
import { detectOwnerPrivileges } from "../detectors/ownerPrivilegeAnalyzer.js";
import { detectMint } from "../detectors/mintDetector.js";
import { SEVERITY_SCORE } from "../utils/findings.js";

// --- HELPER FUNCTIONS (The missing pieces) ---

function normalizeSeverity(severity) {
    const s = (severity || "").toUpperCase();
    if (["CRITICAL", "SEVERE", "HIGH_RISK"].includes(s)) return "CRITICAL";
    if (s === "HIGH") return "HIGH";
    if (s === "MEDIUM") return "MEDIUM";
    return "LOW";
}

function normalizeFindings(findings) {
    return findings.map((f) => ({
        type: f.type || "UNKNOWN",
        severity: normalizeSeverity(f.severity),
        message: f.message || "No description provided",
        confidence: typeof f.confidence === "number" ? f.confidence : 1.0,
        timestamp: new Date().toISOString()
    }));
}

function generateSummary(findings) {
    const summary = { totalIssues: findings.length, critical: 0, high: 0, medium: 0, low: 0 };
    findings.forEach(f => {
        if (f.severity === "CRITICAL") summary.critical++;
        else if (f.severity === "HIGH") summary.high++;
        else if (f.severity === "MEDIUM") summary.medium++;
        else summary.low++;
    });
    return summary;
}

export function computeSecurityScore(findings) {
    let penaltyTotal = 0;
    for (const f of findings) {
        const base = SEVERITY_SCORE[f.severity] || 10;
        penaltyTotal += base * (f.confidence || 1.0);
    }
    return Math.max(0, Math.min(100, Math.round(100 - penaltyTotal)));
}

export function getRiskLevel(score) {
    if (score <= 30) return "CRITICAL";
    if (score <= 60) return "HIGH";
    if (score <= 85) return "MEDIUM";
    return "LOW";
}

// --- MAIN EXPORT ---

export function analyzeContract(ast) {
    if (!ast) throw new Error("AST is undefined");
    
    const rawFindings = [];
    
    // Safely run each detector
    try { rawFindings.push(...detectBlacklist(ast)); } catch (e) { console.error("Blacklist Error:", e.message); }
    try { rawFindings.push(...detectSellLock(ast)); } catch (e) { console.error("SellLock Error:", e.message); }
    try { rawFindings.push(...detectOwnerPrivileges(ast)); } catch (e) { console.error("Owner Error:", e.message); }
    try { rawFindings.push(...detectMint(ast)); } catch (e) { console.error("Mint Error:", e.message); }
    try { rawFindings.push(...detectHighTax(ast)); } catch (e) { console.error("HighTax Error:", e.message); }
    try { rawFindings.push(...detectRequireRisks(ast)); } catch (e) { console.error("Require Error:", e.message); }
    try { rawFindings.push(...detectTransferRestrictions(ast)); } catch (e) { console.error("Transfer Error:", e.message); }    
    
    const findings = normalizeFindings(rawFindings);
    const securityScore = computeSecurityScore(findings);
    const riskLevel = getRiskLevel(securityScore);
    const summary = generateSummary(findings);

    return {
        success: true,
        securityScore,
        riskLevel,
        findings,
        summary
    };
}

// Alias for engine compatibility
export { computeSecurityScore as computeRiskScore };