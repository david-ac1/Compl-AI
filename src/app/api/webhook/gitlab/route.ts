import { NextRequest, NextResponse } from 'next/server';
import { runComplianceCheck } from '@/app/actions';

// Define the shape of a GitLab Merge Request Event (simplified for demo)
interface GitLabMREvent {
    object_kind: string;
    project: {
        id: number;
        name: string;
    };
    object_attributes: {
        iid: number;
        title: string;
        description: string;
        state: string;
        source_branch: string;
        target_branch: string;
        action: string;
    };
    // In a real scenario, we'd fetch the diff from the API using project.id + iid.
    // For this PROD-LIKE DEMO, we accept an optional 'changes' field in the payload
    // which simulates the content we would have fetched.
    changes?: {
        diff: string;
    };
}

export async function POST(req: NextRequest) {
    try {
        const token = req.headers.get('X-Gitlab-Token');
        const secret = process.env.GITLAB_WEBHOOK_SECRET;

        // 1. Security Check (Prod Requirement)
        if (secret && token !== secret) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const event: GitLabMREvent = await req.json();

        // 2. Filter for Merge Request Events
        if (event.object_kind !== 'merge_request') {
            return NextResponse.json({ message: 'Ignored event type' }, { status: 200 });
        }

        const mr = event.object_attributes;
        console.log(`Received Webhook for MR !${mr.iid}: ${mr.title}`);

        // 3. Get the Code Changes
        // In PROD, we fetch the real diff from GitLab using the Project ID and MR IID from the webhook event
        console.log(`Fetching changes for Project ${event.project.id} MR !${mr.iid}...`);

        // Dynamic import to avoid build complexity if file doesn't exist yet (though it should)
        const { fetchMergeRequestChanges } = await import('@/lib/gitlab');

        let diff = "";
        try {
            diff = await fetchMergeRequestChanges(event.project.id, mr.iid);
            console.log("Fetched Diff Length:", diff.length);
        } catch (e) {
            console.error("Failed to fetch real diff, falling back to simulation payload if present", e);
            diff = event.changes?.diff || "# Error fetching diff";
        }

        // 4. Run Analysis (server action logic reused)
        // This triggers the Agent (Gemini or Regex) and updates the Store
        const report = await runComplianceCheck(diff);

        console.log("Compliance Check Complete:", report.summary);

        return NextResponse.json({
            message: 'Analysis complete',
            summary: report.summary,
            status: report.status
        }, { status: 200 });

    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
