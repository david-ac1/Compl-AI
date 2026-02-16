import GlobalHealthWidget from "@/components/GlobalHealthWidget";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 gap-8">
      <GlobalHealthWidget />

      <div className="flex gap-4">
        <Link
          href="/mr"
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-charcoal-gray hover:bg-gray-50 hover:border-royal-blue/30 transition-all shadow-sm"
        >
          View MR Demo
        </Link>
        <Link
          href="/chat"
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-charcoal-gray hover:bg-gray-50 hover:border-royal-blue/30 transition-all shadow-sm"
        >
          View Chat Demo
        </Link>
      </div>
    </main>
  );
}
