const GITLAB_API_URL = "https://gitlab.com/api/v4";

interface GitLabChange {
    diff: string;
    new_path: string;
    old_path: string;
    new_file: boolean;
    renamed_file: boolean;
    deleted_file: boolean;
}

export async function fetchMergeRequestChanges(projectId: number, mrIid: number): Promise<string> {
    const token = process.env.GITLAB_PAT;

    if (!token) {
        console.warn("GITLAB_PAT not set. Returning mock diff for simulation.");
        return `resource "aws_db_instance" "production" {
  # MOCK DIFF (Missing GITLAB_PAT)
  identifier = "mock-db"
  region     = "us-east-1"
}`;
    }

    try {
        const response = await fetch(
            `${GITLAB_API_URL}/projects/${projectId}/merge_requests/${mrIid}/changes`,
            {
                headers: {
                    "PRIVATE-TOKEN": token,
                },
                cache: "no-store", // Ensure we always get fresh diffs
            }
        );

        if (!response.ok) {
            console.error(`GitLab API Error: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch MR changes: ${response.statusText}`);
        }

        const data = await response.json();
        const changes: GitLabChange[] = data.changes;

        // Combine all relevant diffs into one string for the Agent
        const combinedDiff = changes
            .filter(c => c.new_path.endsWith('.tf') || c.new_path.endsWith('main.tf')) // Focus on Terraform
            .map(c => `File: ${c.new_path}\n${c.diff}`)
            .join('\n\n');

        return combinedDiff || "# No Infrastructure Changes Detected";

    } catch (error) {
        console.error("Error fetching from GitLab:", error);
        throw error;
    }
}
