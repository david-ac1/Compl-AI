import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { PolicySchema } from '@/lib/types';

export class PolicyInterpreterAgent {
    private policiesPath: string;

    constructor(policiesPath?: string) {
        this.policiesPath = policiesPath || path.join(process.cwd(), 'src', 'data', 'policies.yaml');
    }

    public async loadPolicies(): Promise<PolicySchema[]> {
        try {
            const fileContents = fs.readFileSync(this.policiesPath, 'utf8');
            const data = yaml.load(fileContents) as { policies: PolicySchema[] };
            return data.policies;
        } catch (e) {
            console.error("Failed to load policies:", e);
            return [];
        }
    }
}
