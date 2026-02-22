import GlobalHealthWidget from "@/components/GlobalHealthWidget";
import Link from "next/link";
import { getGlobalStats } from "./actions";
import { auth } from "@/lib/auth";

export default async function Home() {
  const stats = await getGlobalStats();
  const session = await auth();

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
        {session?.user && (
          <p className="text-sm text-royal-blue font-medium">
            Signed in as {session.user.name}
          </p>
        )}
      </div>

      {/* Main Widget */}
      <GlobalHealthWidget stats={stats} />

      <div className="flex gap-4 flex-wrap justify-center">
        {session ? (
          <>
            <Link
              href="/connect"
              className="px-6 py-3 bg-royal-blue text-white font-semibold rounded-lg shadow-md hover:bg-royal-blue/90 transition-colors flex items-center gap-2"
            >
              <span className="material-icons">link</span>
              Connect Repos
            </Link>
            <Link
              href="/mr"
              className="px-6 py-3 bg-white text-royal-blue font-semibold rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <span className="material-icons">code</span>
              View MR Demo
            </Link>
          </>
        ) : (
          <Link
            href="/auth/signin"
            className="px-6 py-3 bg-[#FC6D26] text-white font-semibold rounded-xl shadow-md hover:bg-[#e6611f] transition-colors flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
            </svg>
            Sign in with GitLab
          </Link>
        )}
      </div>

      <div className="text-xs text-gray-400">
        Hackathon Demo • "Sovereign AI" Category
      </div>
    </main>
  );
}

