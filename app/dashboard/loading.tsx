export default function Loading() {
  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-2">
          <div className="h-6 w-56 animate-pulse rounded bg-[#12151C]" />
          <div className="h-4 w-72 animate-pulse rounded bg-[#12151C]" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl border border-[#232733] bg-[#12151C]" />
          ))}
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl border border-[#232733] bg-[#12151C]" />
          ))}
        </div>
      </div>
    </div>
  );
}