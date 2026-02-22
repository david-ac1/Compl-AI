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

        // 3. Get the Code Changes using the token registered by the project owner
        console.log(`Fetching changes for Project ${event.project.id} MR !${mr.iid}...`);

        const { getTokenForProject } = await import('@/lib/token-store');
        const { fetchMergeRequestChanges } = await import('@/lib/gitlab');

        const userToken = getTokenForProject(event.project.id);

        let diff = "";
        if (userToken) {
            try {
                diff = await fetchMergeRequestChanges(event.project.id, mr.iid, userToken);
                console.log("Fetched real diff, length:", diff.length);
            } catch (e) {
                console.error("Failed to fetch real diff:", e);
                diff = event.changes?.diff || "# Error fetching diff from GitLab";
            }
        } else {
            // No token registered for this project — fall back to env PAT if set
            console.warn(`No registered token for project ${event.project.id}. Falling back to GITLAB_PAT.`);
            try {
                diff = await fetchMergeRequestChanges(event.project.id, mr.iid);
            } catch {
                diff = event.changes?.diff || "# No token available. Register this project via /connect.";
            }
        }

        // 4. Run Analysis — triggers the Agent and updates the Store
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
