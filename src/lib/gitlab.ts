const GITLAB_API_URL = "https://gitlab.com/api/v4";

interface GitLabChange {
    diff: string;
    new_path: string;
    old_path: string;
    new_file: boolean;
    renamed_file: boolean;
    deleted_file: boolean;
}

export async function fetchMergeRequestChanges(projectId: number, mrIid: number, token?: string): Promise<string> {
    const resolvedToken = token ?? process.env.GITLAB_PAT;

    if (!resolvedToken) {
        console.warn("No GitLab token available. Returning mock diff.");
        return `resource "aws_db_instance" "production" {
  # MOCK DIFF (no token provided)
  identifier = "mock-db"
  region     = "us-east-1"
}`;
    }

    try {
        const response = await fetch(
            `${GITLAB_API_URL}/projects/${projectId}/merge_requests/${mrIid}/changes`,
            {
                headers: {
                    "PRIVATE-TOKEN": resolvedToken,
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.error(`GitLab API Error: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch MR changes: ${response.statusText}`);
        }

        const data = await response.json();
        const changes: GitLabChange[] = data.changes;

        // Combine all diffs — prefer .tf files, but fall back to all files if none
        const tfChanges = changes.filter(c => c.new_path.endsWith('.tf'));
        const relevantChanges = tfChanges.length > 0 ? tfChanges : changes;

        const combinedDiff = relevantChanges
            .map(c => `File: ${c.new_path}\n${c.diff}`)
            .join('\n\n');

        return combinedDiff || "# No Infrastructure Changes Detected";

    } catch (error) {
        console.error("Error fetching from GitLab:", error);
        throw error;
    }
}
