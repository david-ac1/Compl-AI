import ChatSidebar from "@/components/ChatSidebar";

export default function ChatPage() {
    return (
        <div className="flex h-screen bg-[#F9FAFB] font-display overflow-hidden">
            <div className="flex-1 bg-[#F3F4F6] p-8 hidden lg:flex flex-col gap-6 overflow-y-auto">
                <nav className="flex items-center gap-4 text-sm text-charcoal-gray/60">
                    <span>Projects</span>
                    <span className="material-icons text-xs">chevron_right</span>
                    <span>Infrastructure</span>
                    <span className="material-icons text-xs">chevron_right</span>
                    <span className="text-charcoal-gray font-semibold">
                        Global-Deployment-Mesh
                    </span>
                </nav>
                <div className="grid grid-cols-3 gap-6">
                    <div className="h-32 rounded-xl bg-clean-white border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
                        <div className="text-xs font-bold text-charcoal-gray/40 uppercase tracking-widest mb-2">
                            Total Clusters
                        </div>
                        <div className="text-3xl font-bold text-charcoal-gray">12</div>
                    </div>
                    <div className="h-32 rounded-xl bg-clean-white border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
                        <div className="text-xs font-bold text-charcoal-gray/40 uppercase tracking-widest mb-2">
                            Active Regions
                        </div>
                        <div className="text-3xl font-bold text-emerald-600">8</div>
                    </div>
                    <div className="h-32 rounded-xl bg-clean-white border border-gray-200 p-4 shadow-sm flex flex-col justify-center">
                        <div className="text-xs font-bold text-charcoal-gray/40 uppercase tracking-widest mb-2">
                            Security Score
                        </div>
                        <div className="text-3xl font-bold text-sovereign-blue">98%</div>
                    </div>
                </div>
                <div className="flex-1 rounded-xl bg-clean-white border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                        <h3 className="font-semibold text-charcoal-gray">
                            Infrastructure Logs
                        </h3>
                        <span className="text-xs text-sovereign-blue font-medium cursor-pointer hover:underline">
                            View Full Dashboard
                        </span>
                    </div>
                    <div className="p-4 space-y-3 font-mono text-xs text-gray-500">
                        <div className="flex gap-2">
                            <span className="text-emerald-600">[INFO]</span>
                            <span>System initialization complete. Loaded 12 clusters.</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-sovereign-blue">[AUDIT]</span>
                            <span>Synced compliance policies for af-south-1.</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-gray-400">[DEBUG]</span>
                            <span>Latency check: 12ms (CPT-JHB).</span>
                        </div>
                        <div className="h-4 w-3/4 bg-gray-50 rounded animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-gray-50 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
            <ChatSidebar />
        </div>
    );
}
