import Link from "next/link";
import { getPostGradient } from "@/lib/postBanner";

export default function PostCard({ post }: { post: any }) {
  const gradient = getPostGradient(post._id);

  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="flex gap-4 rounded-xl border border-[#232733] bg-[#12151C] p-4 transition-colors hover:border-[#333844]"
    >
      <div
        className={`h-16 w-24 shrink-0 rounded-lg bg-gradient-to-br ${gradient}`}
      />
      <div className="min-w-0">
        <span className="text-xs font-mono text-[#7C6FF5]">
          {post.communityId?.name}
        </span>
        <h3 className="mt-0.5 truncate text-sm font-medium text-[#E6E8EB]">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-[#8B92A3]">
          {post.content}
        </p>
        <p className="mt-2 text-xs text-[#8B92A3]">
          {post.authorId?.name}
        </p>
      </div>
    </Link>
  );
}