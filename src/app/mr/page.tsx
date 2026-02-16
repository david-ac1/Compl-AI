import InlineSentinel from "@/components/InlineSentinel";

export default function MRPage() {
    return (
        <div className="bg-[#F6F8FA] min-h-screen p-8 flex justify-center items-start pt-20">
            <div className="w-full max-w-4xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">!124 Update infrastructure region</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium text-xs">Open</span>
                        <span>opened 2 minutes ago by</span>
                        <span className="font-semibold text-gray-900">@david-dev</span>
                    </div>
                </div>
                <InlineSentinel />
            </div>
        </div>
    );
}
