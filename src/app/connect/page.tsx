'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerUserProject, getUserProjects } from "@/app/actions";

interface Project {
    id: number;
    name: string;
    path_with_namespace: string;
    web_url: string;
}

export default function ConnectPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState<number | null>(null);
    const [registered, setRegistered] = useState<Set<number>>(new Set());

    useEffect(() => {
        if (status === "unauthenticated") router.push("/auth/signin");
    }, [status, router]);

    useEffect(() => {
        if (status !== "authenticated") return;
        const accessToken = (session as any)?.accessToken;
        if (!accessToken) return;

        fetch("https://gitlab.com/api/v4/projects?membership=true&per_page=20", {
            headers: { "PRIVATE-TOKEN": accessToken },
        })
            .then((r) => r.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProjects(data);
                } else {
                    console.error("GitLab API returned unexpected response:", data);
                    setProjects([]);
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [session, status]);

    const handleRegister = async (project: Project) => {
        setRegistering(project.id);
        const accessToken = (session as any)?.accessToken;
        await registerUserProject(project.id, accessToken);
        setRegistered((prev) => new Set(prev).add(project.id));
        setRegistering(null);
    };

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <span className="material-icons animate-spin text-royal-blue text-4xl">refresh</span>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-royal-blue">Connect Repositories</h1>
                    <p className="text-charcoal-gray/70 mt-1">
                        Select repos to monitor. Compl-AI will analyze every Merge Request automatically.
                    </p>
                </div>

                <div className="bg-white rounded-xl border border-border-gray shadow-sm overflow-hidden">
                    {projects.length === 0 ? (
                        <div className="p-8 text-center text-charcoal-gray/50">
                            No projects found. Ensure you have membership in at least one GitLab project.
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className="flex items-center justify-between p-4 border-b border-border-gray last:border-b-0 hover:bg-slate-50"
                            >
                                <div>
                                    <p className="font-semibold text-charcoal-gray">{project.name}</p>
                                    <p className="text-xs text-charcoal-gray/50">{project.path_with_namespace}</p>
                                </div>
                                <button
                                    onClick={() => handleRegister(project)}
                                    disabled={registered.has(project.id) || registering === project.id}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${registered.has(project.id)
                                        ? "bg-green-100 text-green-700 cursor-default"
                                        : "bg-royal-blue text-white hover:bg-royal-blue/90"
                                        }`}
                                >
                                    {registered.has(project.id)
                                        ? "✓ Monitoring"
                                        : registering === project.id
                                            ? "Registering..."
                                            : "Monitor"}
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-sm text-blue-700">
                    <strong>After registering:</strong> Add a GitLab Webhook pointing to{" "}
                    <code className="bg-blue-100 px-1 rounded">/api/webhook/gitlab</code> in each project's settings.
                </div>
            </div>
        </main>
    );
}
