/**
 * In-memory store mapping GitLab projectId → user's access token.
 * In production, replace with Vercel KV / Redis / Supabase.
 */

type ProjectId = number;

const projectTokenMap = new Map<ProjectId, string>();

export function registerProject(projectId: ProjectId, accessToken: string): void {
    projectTokenMap.set(projectId, accessToken);
    console.log(`[TokenStore] Registered project ${projectId}`);
}

export function getTokenForProject(projectId: ProjectId): string | null {
    return projectTokenMap.get(projectId) ?? null;
}

export function getRegisteredProjects(): ProjectId[] {
    return Array.from(projectTokenMap.keys());
}
