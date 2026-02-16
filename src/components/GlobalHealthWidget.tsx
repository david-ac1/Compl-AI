'use client';

import React, { useState } from "react";
import { GlobalStats } from "@/lib/types";
import { getGlobalStats } from "@/app/actions";

// Helper to format date relative
function timeAgo(date: Date | string) {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
}

interface Props {
    stats?: GlobalStats;
}

export default function GlobalHealthWidget({ stats: initialStats }: Props) {
    const [stats, setStats] = useState<GlobalStats | undefined>(initialStats);
    const [loading, setLoading] = useState(false);

    const handleRefresh = async () => {
        setLoading(true);
        try {
            const newStats = await getGlobalStats();
            setStats(newStats);
        } catch (error) {
            console.error("Failed to refresh stats", error);
        } finally {
            setLoading(false);
        }
    };

    // Default fallback values if stats aren't loaded yet
    const score = stats?.complianceScore ?? 89;
    const scans = stats?.scansPerformed ?? 0;
    const lastSync = stats?.lastSync ?? new Date();

    // Calculate strokeDashoffset for SVG circle (circumference approx 264)
    // 100% = 0 offset, 0% = 264 offset
    const circumference = 263.89;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="max-w-4xl w-full bg-white border border-border-gray rounded-xl shadow-xl overflow-hidden font-display">
            <div className="p-6 border-b border-border-gray flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-royal-blue rounded-lg text-white">
                        <span className="material-icons text-xl">security</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-royal-blue">
                            Compl-AI
                        </h1>
                        <p className="text-xs uppercase tracking-widest text-charcoal-gray font-semibold">
                            Autonomous Compliance Agent
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-charcoal-gray/60 uppercase">
                            Last Sync
                        </span>
                        <span className="text-xs font-medium text-charcoal-gray">
                            {timeAgo(lastSync)}
                        </span>
                    </div>
                    <button
                        onClick={handleRefresh}
                        className={`p-2 hover:bg-slate-100 rounded-full transition-all ${loading ? 'animate-spin text-royal-blue' : 'text-royal-blue'}`}
                        disabled={loading}
                    >
                        <span className="material-icons text-royal-blue">refresh</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-4 p-8 border-r border-border-gray flex flex-col items-center justify-center text-center">
                    <div className="relative w-48 h-48 mb-6">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle
                                className="text-slate-100 stroke-current"
                                cx="50"
                                cy="50"
                                fill="transparent"
                                r="42"
                                strokeWidth="8"
                            ></circle>
                            <circle
                                className="text-royal-blue stroke-current transition-all duration-1000 ease-out origin-center -rotate-90"
                                cx="50"
                                cy="50"
                                fill="transparent"
                                r="42"
                                strokeLinecap="round"
                                strokeWidth="8"
                                style={{
                                    strokeDasharray: circumference,
                                    strokeDashoffset: offset,
                                }}
                            ></circle>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-bold text-royal-blue">{score}%</span>
                            <span className="text-[10px] font-semibold text-charcoal-gray uppercase tracking-tighter">
                                Compliant
                            </span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-charcoal-gray">
                            {score >= 90 ? 'Excellent Status' : score >= 70 ? 'Good Status' : 'At Risk'}
                        </h3>
                        <p className="text-sm text-charcoal-gray/70">
                            {scans} scans performed across active regions.
                        </p>
                    </div>
                    <button className="mt-6 px-6 py-2 bg-royal-blue text-white text-sm font-semibold rounded-lg hover:bg-royal-blue/90 transition-all shadow-md cursor-pointer">
                        View Full Audit
                    </button>
                </div>
                <div className="lg:col-span-8 p-6 bg-slate-50/30 relative overflow-hidden">
                    <div className="absolute top-4 right-6 flex gap-2 z-10">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-royal-blue"></span>
                            <span className="text-[10px] font-medium text-charcoal-gray">
                                Stable
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            <span className="text-[10px] font-medium text-charcoal-gray">
                                Warning
                            </span>
                        </div>
                    </div>
                    <div className="relative aspect-[16/9] w-full mt-4">
                        <img
                            alt="Global map visualization"
                            className="w-full h-full object-contain opacity-30 pointer-events-none"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw4tmAx4Vrn2wjMyfvtaQSuv6axU76FlTO1Mo_kpy_VNKd2nSY6-7RGPXsCC7j2IGenY4pVYyzckvrBZwscO8jon97gCxkjLhNYA-Z8vQKS2W-h8Br3LXadrVdkIZcidq57KYkLVyYa7tagBy9-CSVbmXbH3BrKrQB8MXSgalfL03R6GHZoTWv9SvN8lf8mvOarG9YwtaAYSKp3c-n_1GyMFI4p83L7eKRjusJ2KVaRFB7luaZicm3BxCZvkQnPNKpIWLnWgcWAJRi"
                        />
                        {/* Map Markers */}
                        <div className="absolute top-[35%] left-[20%] group">
                            <div className="w-3 h-3 bg-royal-blue rounded-full ring-4 ring-royal-blue/20 cursor-pointer"></div>
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white border border-border-gray rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                USA: HIPAA/CCPA
                            </div>
                        </div>
                        <div className="absolute top-[65%] left-[32%]">
                            <div className="w-3 h-3 bg-royal-blue rounded-full ring-4 ring-royal-blue/20"></div>
                        </div>
                        <div className="absolute top-[80%] left-[28%]">
                            <div className="w-3 h-3 bg-royal-blue rounded-full ring-4 ring-royal-blue/20"></div>
                        </div>
                        <div className="absolute top-[32%] left-[48%]">
                            <div className="w-3 h-3 bg-royal-blue rounded-full ring-4 ring-royal-blue/20"></div>
                        </div>
                        <div className="absolute top-[30%] left-[51%]">
                            <div className="w-3 h-3 bg-royal-blue rounded-full ring-4 ring-royal-blue/20"></div>
                        </div>
                        <div className="absolute top-[38%] left-[45%]">
                            <div className="w-3 h-3 bg-royal-blue rounded-full ring-4 ring-royal-blue/20"></div>
                        </div>
                        <div className="absolute top-[55%] left-[49%]">
                            <div className="w-3 h-3 bg-royal-blue rounded-full ring-4 ring-royal-blue/20"></div>
                        </div>
                        <div className="absolute top-[78%] left-[54%]">
                            <div className="relative">
                                <div className="w-4 h-4 bg-amber-500 rounded-full ring-4 ring-amber-500/20 z-10 relative"></div>
                                <div className="absolute inset-0 w-4 h-4 bg-amber-500 rounded-full animate-ping opacity-75"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 border-t border-border-gray bg-white">
                <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-gray/60 mb-4 px-2">
                    Regional Compliance Status
                </h4>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] text-royal-blue font-bold uppercase tracking-widest border-b border-border-gray/50">
                                <th className="px-3 py-2 pb-4">Country / Region</th>
                                <th className="px-3 py-2 pb-4">Standard</th>
                                <th className="px-3 py-2 pb-4">Status</th>
                                <th className="px-3 py-2 pb-4 text-right">Data Locality</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="hover:bg-slate-50 transition-colors border-b border-border-gray/30">
                                <td className="px-3 py-4 flex items-center gap-3">
                                    <span className="material-icons text-amber-500 text-lg">
                                        warning
                                    </span>
                                    <span className="font-semibold text-charcoal-gray">
                                        South Africa
                                    </span>
                                </td>
                                <td className="px-3 py-4 text-charcoal-gray/60 font-mono text-xs">
                                    POPIA
                                </td>
                                <td className="px-3 py-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 uppercase">
                                        Action Required
                                    </span>
                                </td>
                                <td className="px-3 py-4 text-right font-medium text-xs text-charcoal-gray/70">
                                    Cape Town (ZAF-1)
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors border-b border-border-gray/30">
                                <td className="px-3 py-4 flex items-center gap-3">
                                    <span className="material-icons text-royal-blue text-lg">
                                        verified_user
                                    </span>
                                    <span className="font-semibold text-charcoal-gray">USA</span>
                                </td>
                                <td className="px-3 py-4 text-charcoal-gray/60 font-mono text-xs">
                                    HIPAA / CCPA
                                </td>
                                <td className="px-3 py-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-royal-blue/10 text-royal-blue border border-royal-blue/20 uppercase">
                                        Stable
                                    </span>
                                </td>
                                <td className="px-3 py-4 text-right font-medium text-xs text-charcoal-gray/70">
                                    N. Virginia (US-E1)
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition-colors">
                                <td className="px-3 py-4 flex items-center gap-3">
                                    <span className="material-icons text-emerald-600 text-lg">
                                        stars
                                    </span>
                                    <span className="font-semibold text-charcoal-gray">
                                        France
                                    </span>
                                </td>
                                <td className="px-3 py-4 text-charcoal-gray/60 font-mono text-xs">
                                    GDPR / ANSSI
                                </td>
                                <td className="px-3 py-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 uppercase">
                                        Optimal
                                    </span>
                                </td>
                                <td className="px-3 py-4 text-right font-medium text-xs text-charcoal-gray/70">
                                    Paris (EU-W3)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-border-gray flex items-center justify-between text-[11px] font-medium text-charcoal-gray/70">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                        AI Agent Active
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{" "}
                        Edge Nodes Synced
                    </span>
                </div>
                <a
                    className="hover:text-royal-blue transition-colors flex items-center gap-1 uppercase tracking-wider"
                    href="#"
                >
                    System Diagnostics{" "}
                    <span className="material-icons text-xs">arrow_forward</span>
                </a>
            </div>
        </div>
    );
}
