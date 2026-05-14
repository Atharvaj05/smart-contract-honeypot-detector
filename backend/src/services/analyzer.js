import { detectBlacklist }
from "../detectors/blacklistDetector.js";

export function analyzeContract(ast) {

    const findings = [];

    findings.push(
        ...detectBlacklist(ast)
    );

    return findings;

}