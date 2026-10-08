
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getPostBySlug } from "@/lib/services/postService";
import { isBookmarked } from "@/lib/services/bookmarkService";

import { getCommentsByPost } from "@/lib/services/commentService";
import CommentSection from "@/components/CommentSection";
import BookmarkButton from "@/components/BookmarkButton";

import DeletePostButton from "@/components/DeletePostButton";
export const revalidate = 30;
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const comments = await getCommentsByPost(post._id);

  const session = await auth();
  const userId = session?.user ? (session.user as any).id : null;
  const bookmarked = userId ? await isBookmarked(userId, post._id) : false;

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <Link
          href={`/communities/${post.communityId?.slug}`}
          className="text-sm font-mono text-[#7C6FF5] hover:underline"
        >
          {post.communityId?.name}
        </Link>
{/* 
        <h1 className="text-2xl font-semibold text-[#E6E8EB] mt-3">
          {post.title}
        </h1> */}

<h1 className="text-2xl font-semibold text-[#E6E8EB] mt-3">
  {post.title}
</h1>

<div className="flex items-center justify-between mt-3">
  <p className="text-sm text-[#8B92A3]">By {post.authorId?.name}</p>
  <div className="flex items-center gap-2">
    {userId === post.authorId?._id && (
      <>
        <Link
          href={`/blogs/${post.slug}/edit`}
          className="text-sm text-[#8B92A3] hover:text-[#E6E8EB] border border-[#232733] rounded-lg px-3 py-1.5 transition-colors"
        >
          Edit
        </Link>
        <DeletePostButton postId={post._id} />
      </>
    )}
    <BookmarkButton
      postId={post._id}
      initialIsBookmarked={bookmarked}
      isSignedIn={!!session?.user}
    />
  </div>
</div>


        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-[#8B92A3]">By {post.authorId?.name}</p>
          <BookmarkButton
            postId={post._id}
            initialIsBookmarked={bookmarked}
            isSignedIn={!!session?.user}
          />
        </div>

        <div className="mt-6 text-[#E6E8EB] whitespace-pre-wrap leading-relaxed">
          {post.content}
        </div>

        {post.tags?.length > 0 && (
          <div className="flex gap-2 mt-6 flex-wrap">
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

        <div className="mt-10 pt-8 border-t border-[#232733]">
          <CommentSection postId={post._id} initialComments={comments} />
        </div>
      </div>
    </div>
  );
}