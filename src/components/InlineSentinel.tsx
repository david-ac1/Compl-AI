import React, { useMemo } from "react";
import { ComplianceReport, Finding } from "@/lib/types";

interface InlineSentinelProps {
    diff: string;
    report?: ComplianceReport;
}

export default function InlineSentinel({ diff, report }: InlineSentinelProps) {
    const lines = useMemo(() => diff.split("\n"), [diff]);

    // Helper to find findings for a specific line
    const getFindingsForLine = (lineIndex: number) => {
        if (!report) return [];
        // Findings use 1-based indexing
        return report.findings.filter((f) => f.line === lineIndex + 1);
    };

    return (
        <div className="w-full max-w-4xl space-y-4 font-display">
            <div className="bg-white border border-[var(--border-color)] rounded-lg overflow-hidden shadow-sm">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#F6F8FA] border-b border-[var(--border-color)]">
                    <span className="text-xs font-mono text-slate-500">
                        terraform/main.tf
                    </span>
                </div>
                <div className="p-4 font-mono text-sm leading-relaxed overflow-x-auto text-slate-600">
                    {lines.map((line, index) => {
                        const isAdded = line.startsWith("+");
                        const isRemoved = line.startsWith("-");
                        const findings = getFindingsForLine(index);
                        const hasFindings = findings.length > 0;

                        return (
                            <React.Fragment key={index}>
                                <div
                                    className={`flex ${isAdded
                                            ? "bg-green-50 text-green-700"
                                            : isRemoved
                                                ? "bg-red-50 text-red-700"
                                                : ""
                                        } ${hasFindings ? "bg-amber-50" : ""}`}
                                >
                                    <span
                                        className={`w-8 shrink-0 select-none ${isAdded
                                                ? "text-green-300"
                                                : isRemoved
                                                    ? "text-red-300"
                                                    : "text-slate-400"
                                            }`}
                                    >
                                        {index + 1}{" "}
                                        {isAdded ? "+" : isRemoved ? "-" : "\u00A0"}
                                    </span>
                                    <span className="ml-4 whitespace-pre">{line.substring(1) || line}</span>
                                </div>
                                {hasFindings && (
                                    <div className="pl-12 pr-4 py-2 bg-amber-50/50 border-l-4 border-amber-400 my-1">
                                        {findings.map((finding, fIndex) => (
                                            <div key={fIndex} className="text-xs text-amber-800">
                                                <strong>{finding.riskLevel.toUpperCase()}:</strong> {finding.message}
                                                <div className="mt-1 text-amber-700/80">Suggestion: {finding.remediation}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {report && report.findings.length > 0 && (
                    <div className="bg-white border-t border-[var(--border-color)]">
                        <div className="m-4 rounded-lg border border-[var(--border-color)] shadow-sm overflow-hidden bg-white">
                            <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-[var(--border-color)]">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-royal-blue flex items-center justify-center shadow-sm">
                                        <span className="material-icons text-white text-lg">
                                            security
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-sm tracking-tight text-charcoal-gray flex items-center gap-2">
                                        <span className="text-royal-blue text-base material-icons">
                                            warning
                                        </span>{" "}
                                        Compliance &amp; Risk Analysis
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-royal-blue text-royal-blue uppercase">
                                        Compl-AI
                                    </span>
                                </div>
                            </div>

                            {/* Rendering logic for specific findings - tailored to the demo scenarios */}
                            {report.findings.some(f => f.ruleId === 'popia-data-residency') && (
                                <div className="p-5 border-b border-[#F0F0F0]">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 pt-1">
                                            <span className="material-icons text-red-600">gavel</span>
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="text-xs font-bold text-charcoal-gray uppercase tracking-wider">
                                                The Bodyguard (Risk)
                                            </h4>
                                            <p className="text-sm text-slate-custom leading-relaxed">
                                                Moving data to a non-sovereign region triggers mandatory{" "}
                                                <span className="underline decoration-red-200">
                                                    POPIA compliance
                                                </span>{" "}
                                                requirements.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Static 'Consultant' block for specific demo triggers, or generic otherwise */}
                            <div className="p-5 bg-white">
                                <div className="flex gap-4">
                                    <div className="shrink-0 pt-1">
                                        <span className="material-icons text-royal-blue">
                                            tips_and_updates
                                        </span>
                                    </div>
                                    <div className="w-full space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-xs font-bold text-charcoal-gray uppercase tracking-wider">
                                                The Consultant (Opportunity)
                                            </h4>
                                            <span className="text-[10px] text-slate-custom italic">
                                                Strategic Advantage Analysis
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-custom">
                                            Optimization opportunities detected based on your infrastructure choices.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

