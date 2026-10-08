export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-3">
        <div className="h-6 w-32 bg-[#12151C] rounded animate-pulse" />
        <div className="h-4 w-64 bg-[#12151C] rounded animate-pulse mb-6" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 bg-[#12151C] border border-[#232733] rounded-xl animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}