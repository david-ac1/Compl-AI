import { Finding, ComplianceReport } from '@/lib/types';

export class ComplianceReporterAgent {
    public generateReport(findings: Finding[]): ComplianceReport {
        const criticalCount = findings.filter(f => f.riskLevel === 'critical').length;
        const warningCount = findings.filter(f => f.riskLevel === 'warning').length;

        let status: 'compliant' | 'warning' | 'critical' = 'compliant';
        if (criticalCount > 0) status = 'critical';
        else if (warningCount > 0) status = 'warning';

        const summary = `Found ${findings.length} issues (${criticalCount} critical, ${warningCount} warning).`;

        return {
            summary,
            findings,
            status
        };
    }
}
