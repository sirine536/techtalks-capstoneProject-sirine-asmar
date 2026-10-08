
import Link from "next/link";
import { getPosts } from "@/lib/services/postService";
import CreatePostForm from "@/components/CreatePostForm";
import SearchInput from "@/components/SearchInput";

export const revalidate = 30;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;
  const { posts } = await getPosts({ search });

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-[#E6E8EB]">Blogs</h1>
            <p className="text-sm text-[#8B92A3] mt-1">
              Technical posts from the community.
            </p>
          </div>
          <CreatePostForm />
        </div>

        <div className="mb-6">
          <SearchInput placeholder="Search posts..." />
        </div>

        {posts.length === 0 ? (
          <div className="border border-dashed border-[#232733] rounded-xl p-10 text-center">
            <p className="text-sm text-[#8B92A3]">
              {search ? `No posts found for "${search}".` : "No posts yet. Be the first to write one."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blogs/${post.slug}`}
                className="block bg-[#12151C] border border-[#232733] hover:border-[#333844] rounded-xl p-5 transition-colors"
              >
                <div className="flex items-center gap-2 text-xs text-[#8B92A3] mb-2">
                  <span className="font-mono text-[#7C6FF5]">
                    {post.communityId?.name}
                  </span>
                  <span>·</span>
                  <span>{post.authorId?.name}</span>
                </div>
                <h2 className="text-[#E6E8EB] font-medium">{post.title}</h2>
                <p className="text-sm text-[#8B92A3] mt-1 line-clamp-2">
                  {post.content}
                </p>
                {post.tags?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs font-mono text-[#7C6FF5] bg-[#7C6FF5]/10 px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}