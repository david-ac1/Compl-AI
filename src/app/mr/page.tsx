'use client';

import { useState } from 'react';
import InlineSentinel from "@/components/InlineSentinel";
import { runComplianceCheck } from '@/app/actions';
import { initialDiff } from '@/data/mockDiff';
import { ComplianceReport } from '@/lib/types';

export default function MRPage() {
    const [diff, setDiff] = useState(initialDiff);
    const [report, setReport] = useState<ComplianceReport | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    const handleRunAnalysis = async () => {
        setLoading(true);
        try {
            const result = await runComplianceCheck(diff);
            setReport(result);
        } catch (e) {
            console.error("Analysis failed", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#F6F8FA] min-h-screen p-8 flex justify-center items-start pt-20">
            <div className="w-full max-w-4xl space-y-6">
                <div className="flex justify-between items-start">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">!124 Update infrastructure region</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium text-xs">Open</span>
                            <span>opened 2 minutes ago by</span>
                            <span className="font-semibold text-gray-900">@david-dev</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Simulation Control
                        </label>
                        <button
                            onClick={handleRunAnalysis}
                            disabled={loading}
                            className="bg-royal-blue text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-royal-blue/90 disabled:opacity-50 transition-all shadow-sm flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <span className="material-icons text-sm">play_arrow</span>
                                    Run Compl-AI Analysis
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Diff Input Area for Simulation */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Diff Simulation Input</h3>
                    <textarea
                        className="w-full h-32 font-mono text-sm p-3 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-royal-blue/20 focus:border-royal-blue outline-none resize-y"
                        value={diff}
                        onChange={(e) => setDiff(e.target.value)}
                        placeholder="Paste a diff here..."
                    />
                    <p className="text-xs text-gray-400 mt-2">
                        Edit the diff above to test different scenarios (e.g., change region, add encryption).
                    </p>
                </div>

                {/* Dynamic Sentinel Component */}
                <InlineSentinel diff={diff} report={report} />
            </div>
        </div>
    );
}

