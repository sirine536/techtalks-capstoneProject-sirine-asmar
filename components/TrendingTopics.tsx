import Link from "next/link";
import { getTrendingTags } from "@/lib/services/postService";

export default async function TrendingTopics() {
  const trending = await getTrendingTags();

  if (trending.length === 0) return null;

  return (
    <div className="rounded-xl border border-[#232733] bg-[#12151C] p-5">
      <h3 className="mb-3 text-sm font-medium text-[#E6E8EB]">🔥 Trending Topics</h3>
      <div className="space-y-2">
        {trending.map((t, i) => (
          <Link
            key={t.tag}
            href={`/blogs?search=${t.tag}`}
            className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-[#1C1F26]"
          >
            <span className="text-[#8B92A3]">
              <span className="mr-2 text-[#7C6FF5]">{i + 1}</span>
              {t.tag}
            </span>
            <span className="text-[#8B92A3]">{t.count} posts</span>
          </Link>
        ))}
      </div>
    </div>
  );
}