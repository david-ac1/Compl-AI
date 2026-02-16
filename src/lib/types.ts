export type RiskLevel = 'info' | 'warning' | 'critical';

export interface PolicyRule {
    id: string;
    name: string;
    description: string;
    riskLevel: RiskLevel;
    triggerPatterns: string[]; // Regex strings to look for in diffs
    condition?: string; // e.g., "region != 'af-south-1'" (simplified for hackathon)
    remediation: string;
    referenceUrl?: string; // Link to POPIA/GDPR text
}

export interface PolicySchema {
    id: string;
    name: string;
    rules: PolicyRule[];
}

export interface Finding {
    ruleId: string;
    policyName: string;
    riskLevel: RiskLevel;
    message: string;
    remediation: string;
    line: number;
    snippet: string;
    referenceUrl?: string;
}

export interface ComplianceReport {
    summary: string;
    findings: Finding[];
    status: 'compliant' | 'warning' | 'critical';
}

export interface GlobalStats {
    complianceScore: number;
    totalClusters: number;
    activeRegions: number;
    scansPerformed: number;
    lastSync: Date;
}
