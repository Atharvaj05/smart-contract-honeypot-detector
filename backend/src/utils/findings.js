export const SEVERITY_SCORE = {
    CRITICAL: 40, // High penalty
    HIGH: 25,
    MEDIUM: 10,
    LOW: 5
};

export const createFinding = (type, message, severity, confidence = 1.0) => {
    return {
        type,
        message,
        severity,
        confidence,
        timestamp: new Date().toISOString()
    };
};