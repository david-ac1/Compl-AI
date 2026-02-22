'use client';

import { signIn } from "next-auth/react";

export default function SignInPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-6 max-w-sm w-full border border-border-gray">
                <div className="p-3 bg-royal-blue rounded-xl text-white">
                    <span className="material-icons text-3xl">security</span>
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-royal-blue">Compl-AI</h1>
                    <p className="text-sm text-charcoal-gray/70 mt-1">Autonomous Compliance Agent</p>
                </div>
                <button
                    onClick={() => signIn("gitlab", { callbackUrl: "/connect" })}
                    className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#FC6D26] text-white font-semibold rounded-xl hover:bg-[#e6611f] transition-all shadow-md"
                >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
                    </svg>
                    Continue with GitLab
                </button>
                <p className="text-xs text-charcoal-gray/50 text-center">
                    We request <strong>read_api</strong> access to analyze your Merge Requests.
                </p>
            </div>
        </main>
    );
}
