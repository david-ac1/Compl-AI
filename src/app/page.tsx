import GlobalHealthWidget from "@/components/GlobalHealthWidget";
import Link from "next/link";
import { getGlobalStats } from "./actions";

export default async function Home() {
  const stats = await getGlobalStats();

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-8">
      {/* Header / Intro */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          GitLab Duo Compl-AI
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Autonomous compliance agent preventing risks before merge.
        </p>
      </div>

      {/* Main Widget */}
      <GlobalHealthWidget stats={stats} />

      <div className="flex gap-4">
        <Link
          href="/mr"
          className="px-6 py-3 bg-white text-royal-blue font-semibold rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-2"
        >
          <span className="material-icons">code</span>
          View MR Demo
        </Link>
        <Link
          href="/chat"
          className="px-6 py-3 bg-royal-blue text-white font-semibold rounded-lg shadow-md hover:bg-royal-blue/90 transition-colors flex items-center gap-2"
        >
          <span className="material-icons">chat</span>
          Open Duo Chat
        </Link>
      </div>

      <div className="text-xs text-gray-400 mt-8">
        Hackathon Demo • "Sovereign AI" Category
      </div>
    </main>
  );
}
