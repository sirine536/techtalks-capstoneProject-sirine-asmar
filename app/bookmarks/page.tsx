// export default function BookmarksPage() {
//   return <div>Bookmarks page - coming soon</div>;
// }
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserBookmarks } from "@/lib/services/bookmarkService";
export const dynamic = "force-dynamic";
export default async function BookmarksPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const posts = await getUserBookmarks((session.user as any).id);

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-xl font-semibold text-[#E6E8EB] mb-1">
          Bookmarks
        </h1>
        <p className="text-sm text-[#8B92A3] mb-8">
          Posts you've saved for later.
        </p>

        {posts.length === 0 ? (
          <div className="border border-dashed border-[#232733] rounded-xl p-10 text-center">
            <p className="text-sm text-[#8B92A3]">No bookmarks yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post: any) => (
              <Link
                key={post._id}
                href={`/blogs/${post.slug}`}
                className="block bg-[#12151C] border border-[#232733] hover:border-[#333844] rounded-xl p-5 transition-colors"
              >
                <span className="text-xs font-mono text-[#7C6FF5]">
                  {post.communityId?.name}
                </span>
                <h2 className="text-[#E6E8EB] font-medium mt-1">{post.title}</h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}