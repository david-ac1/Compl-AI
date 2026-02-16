import React from "react";

export default function ChatSidebar() {
    return (
        <aside className="w-[400px] h-screen bg-clean-white border-l border-gray-200 flex flex-col shadow-xl font-display">
            <header className="p-4 border-b border-gray-200 flex items-center justify-between bg-clean-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sovereign-blue flex items-center justify-center">
                        <span className="material-icons text-white text-lg">security</span>
                    </div>
                    <div>
                        <h1 className="font-semibold text-sm tracking-tight text-gray-900">
                            Sovereign Dev Duo
                        </h1>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600">
                                Active Agent
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                        <span className="material-icons text-xl text-charcoal-gray">
                            settings
                        </span>
                    </button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
                        <span className="material-icons text-xl text-charcoal-gray">
                            close
                        </span>
                    </button>
                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-6">
                <div className="flex flex-col items-end gap-2 max-w-[90%] ml-auto">
                    <div className="bg-sovereign-blue text-white p-3 rounded-xl rounded-tr-none shadow-sm">
                        <p className="text-sm leading-relaxed">
                            Monitor this project across our core deployment hubs: USA, South
                            Africa, Nigeria, France, Germany, Portugal, Brazil, and Chile.
                        </p>
                    </div>
                    <span className="text-[10px] text-charcoal-gray/60 font-medium px-1">
                        10:24 AM
                    </span>
                </div>
                <div className="flex flex-col items-start gap-3 max-w-[95%]">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-sovereign-blue/10 flex items-center justify-center">
                            <span className="material-icons text-xs text-sovereign-blue">
                                auto_awesome
                            </span>
                        </div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-sovereign-blue">
                            Sovereign AI
                        </span>
                    </div>
                    <div className="bg-white border border-gray-200 p-4 rounded-xl rounded-tl-none shadow-sm w-full">
                        <p className="text-sm leading-relaxed mb-4">
                            <span className="font-semibold text-sovereign-blue">
                                Sovereign Dev initialized.
                            </span>{" "}
                            I have loaded the regulatory frameworks for the Global Mobility &amp;
                            Hub Triangle.
                        </p>
                        <div className="relative w-full aspect-video bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-4">
                            <img
                                alt="World Map Light"
                                className="w-full h-full object-cover opacity-60 grayscale brightness-110"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFAoqaiAKyQcQt4s_cKqPXVn_F6cSYr1EwwegYdINDmW5UaWCJe_ktiS7_a48J2tMXqNbwzugOuPpezDY5NEPw_HIP7gLWfpcPGLL0kfjjP7qX7sZGhL9qFfm2JdKKK-KPoJzbilAdEG8vXtr4cGIWC2nI7CQtg49HMd_DC3Qi3Ggqgi_3JrFIVTMI0Epi1SUh7yNi65gODalizdxyanKLiT1G0LgySEDsM4CXdncSqDIArzVIXHfVPcQU5amei4donuJERktNbBF9"
                            />
                            <div className="absolute top-[35%] left-[22%]">
                                <div className="w-2 h-2 bg-sovereign-blue rounded-full animate-ping absolute"></div>
                                <div className="w-2 h-2 bg-sovereign-blue rounded-full relative"></div>
                                <div className="absolute top-3 left-0 bg-white shadow-md border border-gray-100 text-[9px] px-1.5 py-0.5 rounded text-charcoal-gray whitespace-nowrap font-medium z-10">
                                    N. Virginia (US-East)
                                </div>
                            </div>
                            <div className="absolute top-[28%] left-[48%]">
                                <div className="w-2 h-2 bg-sovereign-blue rounded-full animate-ping absolute"></div>
                                <div className="w-2 h-2 bg-sovereign-blue rounded-full relative"></div>
                                <div className="absolute top-3 left-0 bg-white shadow-md border border-gray-100 text-[9px] px-1.5 py-0.5 rounded text-charcoal-gray whitespace-nowrap font-medium z-10">
                                    Paris (EU-West)
                                </div>
                            </div>
                            <div className="absolute top-[75%] left-[53%]">
                                <div className="w-2 h-2 bg-sovereign-blue rounded-full animate-ping absolute"></div>
                                <div className="w-2 h-2 bg-sovereign-blue rounded-full relative"></div>
                                <div className="absolute top-3 left-0 bg-white shadow-md border border-gray-100 text-[9px] px-1.5 py-0.5 rounded text-charcoal-gray whitespace-nowrap font-medium z-10">
                                    Cape Town (AF-South)
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100">
                                <span className="material-icons text-sovereign-blue text-xs">
                                    gavel
                                </span>
                                <span className="text-[11px] font-medium text-charcoal-gray">
                                    GDPR Compliance
                                </span>
                                <span className="material-icons text-emerald-600 text-[10px] ml-auto">
                                    check_circle
                                </span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100">
                                <span className="material-icons text-sovereign-blue text-xs">
                                    verified_user
                                </span>
                                <span className="text-[11px] font-medium text-charcoal-gray">
                                    NDPR (Nigeria)
                                </span>
                                <span className="material-icons text-emerald-600 text-[10px] ml-auto">
                                    check_circle
                                </span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100">
                                <span className="material-icons text-sovereign-blue text-xs">
                                    policy
                                </span>
                                <span className="text-[11px] font-medium text-charcoal-gray">
                                    LGPD (Brazil)
                                </span>
                                <span className="material-icons text-emerald-600 text-[10px] ml-auto">
                                    check_circle
                                </span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-100">
                                <span className="material-icons text-amber-600 text-xs">
                                    sync
                                </span>
                                <span className="text-[11px] font-medium text-charcoal-gray">
                                    Ley N° 19.628
                                </span>
                                <span className="material-icons text-amber-600 text-[10px] ml-auto">
                                    pending
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className="text-[10px] text-charcoal-gray/60 font-medium px-1">
                        10:25 AM
                    </span>
                </div>
                <div className="flex items-center gap-2 px-2">
                    <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-sovereign-blue/40 rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-sovereign-blue/40 rounded-full"></span>
                        <span className="w-1.5 h-1.5 bg-sovereign-blue/40 rounded-full"></span>
                    </div>
                    <span className="text-[10px] text-charcoal-gray/50 italic">
                        Analyzing latency across hubs...
                    </span>
                </div>
            </main>
            <footer className="p-4 bg-clean-white border-t border-gray-200">
                <div className="relative">
                    <textarea
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm p-3 focus:ring-1 focus:ring-sovereign-blue focus:border-sovereign-blue text-charcoal-gray placeholder-gray-400 resize-none pr-10 outline-none"
                        placeholder="Ask Sovereign Dev anything..."
                        rows={3}
                    ></textarea>
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <button className="p-1 hover:text-sovereign-blue transition-colors">
                            <span className="material-icons text-charcoal-gray/50 text-lg">
                                attach_file
                            </span>
                        </button>
                        <button className="w-8 h-8 bg-sovereign-blue rounded-lg flex items-center justify-center text-white hover:bg-opacity-90 transition-all shadow-md">
                            <span className="material-icons text-sm">send</span>
                        </button>
                    </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex gap-2">
                        <button className="px-2 py-1 bg-gray-100 rounded text-[10px] font-semibold text-charcoal-gray border border-transparent hover:border-sovereign-blue/30 transition-all uppercase tracking-wider">
                            HUB REPORT
                        </button>
                        <button className="px-2 py-1 bg-gray-100 rounded text-[10px] font-semibold text-charcoal-gray border border-transparent hover:border-sovereign-blue/30 transition-all uppercase tracking-wider">
                            COMPLIANCE AUDIT
                        </button>
                    </div>
                    <span className="text-[10px] text-charcoal-gray/40">
                        v4.2.1-sovereign
                    </span>
                </div>
            </footer>
        </aside>
    );
}
