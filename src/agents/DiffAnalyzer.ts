import { PolicySchema, Finding, PolicyRule } from '@/lib/types';
import { GitLabAIAdapter } from '@/lib/ai-adapter';

export class DiffAnalyzerAgent {
  public async analyze(diff: string, policies: PolicySchema[]): Promise<Finding[]> {
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    // 1. If API Key exists, use Real AI (Production Mode)
    if (apiKey) {
      try {
        console.log("Analyzing with GitLab AI Adapter (Gemini)...");
        const adapter = new GitLabAIAdapter(apiKey);
        // Convert policies to simplified string to save tokens/context, or send full JSON
        const policiesStr = JSON.stringify(policies);

        const jsonResponse = await adapter.analyzeDiff(diff, policiesStr);
        const findings = JSON.parse(jsonResponse) as Finding[];

        // Post-processing: unnecessary for Gemini 1.5 usually, but safe to strip code blocks just in case
        return findings;
      } catch (e) {
        console.error("AI Analysis Failed, falling back to heuristic engine:", e);
      }
    } else {
      console.warn("No AI Key found. Using heuristic regex engine.");
    }

    // 2. Fallback / Dev Mode: Regex Heuristics
    const findings: Finding[] = [];
    const lines = diff.split('\n');

    for (const policy of policies) {
      for (const rule of policy.rules) {
        for (const pattern of rule.triggerPatterns) {
          const regex = new RegExp(pattern, 'i');
          lines.forEach((line, index) => {
            if (line.trim().startsWith('+')) {
              if (regex.test(line)) {
                findings.push({
                  ruleId: rule.id,
                  policyName: policy.name,
                  riskLevel: rule.riskLevel,
                  message: rule.description,
                  remediation: rule.remediation,
                  line: index + 1,
                  snippet: line.trim(),
                  referenceUrl: rule.referenceUrl
                });
              }
            }
          });
        }
      }
    }
    return findings;
  }
}
