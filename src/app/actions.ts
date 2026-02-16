'use server'

import { PolicyInterpreterAgent } from '@/agents/PolicyInterpreter';
import { DiffAnalyzerAgent } from '@/agents/DiffAnalyzer';
import { ComplianceReporterAgent } from '@/agents/ComplianceReporter';
import { ComplianceReport } from '@/lib/types';

// Singleton-ish instances for the server action
const interpreter = new PolicyInterpreterAgent();
const analyzer = new DiffAnalyzerAgent();
const reporter = new ComplianceReporterAgent();

export async function runComplianceCheck(diff: string): Promise<ComplianceReport> {
    // 1. Interpret Policies
    const policies = await interpreter.loadPolicies();

    // 2. Analyze Diff
    const findings = await analyzer.analyze(diff, policies);

    // 3. Report Results
    const report = reporter.generateReport(findings);

    // 4. Persist to Store
    const { store } = await import('@/lib/store'); // Dynamic import to avoid build complexity with server/client boundaries if any
    store.addScan(report);

    return report;
}

export async function getGlobalStats() {
    const { store } = await import('@/lib/store');
    return store.getStats();
}
