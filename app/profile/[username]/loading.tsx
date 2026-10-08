export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#12151C] animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-[#12151C] rounded animate-pulse" />
            <div className="h-4 w-24 bg-[#12151C] rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}