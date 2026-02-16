import { GoogleGenerativeAI } from "@google/generative-ai";

export class GitLabAIAdapter {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });
  }

  public async analyzeDiff(diff: string, policies: string): Promise<string> {
    const prompt = `
      You are 'Compl-AI', a GitLab Native Security & Compliance Agent.
      
      YOUR GOAL:
      Analyze the provided Infrastructure-as-Code (Terraform) diff against the Organization's Compliance Policies.
      You must act as a strict security auditor.
      
      CONTEXT:
      - The user is opening a Merge Request.
      - You need to block risks BEFORE they merge.
      - You should also suggest optimizations (e.g. cost, performance) if relevant.
      
      POLICIES (YAML):
      ${policies}
      
      CODE DIFF:
      ${diff}
      
      INSTRUCTIONS:
      Return a JSON array of 'Findings'.
      Structure each finding EXACTLY as follows:
      {
        "ruleId": "string (use policy rule id if matching, or create a slug for new findings)",
        "policyName": "string (e.g. 'Data Sovereignty', 'Encryption Standard')",
        "riskLevel": "critical" | "warning" | "info",
        "message": "string (brief, high-Impact summary)",
        "remediation": "string (exact terraform code fix or specific instruction)",
        "line": number (approximate line number in the diff where the added (+) line appears. 1-based.),
        "snippet": "string (the exact line of code from the diff)",
        "referenceUrl": "string (optional url to documentation)"
      }
      
      If the code triggers a policy violation (e.g. region not in allowed list, encryption missing), flag it as CRITICAL or WARNING.
      If the code offers a strategic advantage (e.g. moving to a green energy region), flag it as INFO.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("GitLab Native AI (Simulated) verification failed:", error);
      // Fallback/Error state
      return JSON.stringify([{
        ruleId: 'ai-service-error',
        policyName: 'System',
        riskLevel: 'warning',
        message: 'AI Compliance Service is currently unavailable. Please check API configuration.',
        remediation: 'Verify GOOGLE_GENERATIVE_AI_API_KEY is set.',
        line: 1,
        snippet: 'Error connecting to AI Agent'
      }]);
    }
  }
}
