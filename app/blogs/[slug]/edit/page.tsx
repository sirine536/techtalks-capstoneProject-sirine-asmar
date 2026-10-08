import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPostBySlug } from "@/lib/services/postService";
import EditPostForm from "@/components/EditPostForm";

export const dynamic = "force-dynamic";
export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // OWNERSHIP CHECK on the page itself too — not just the API.
  // The API is the real enforcement, but this prevents showing
  // an edit form to someone who isn't the owner in the first place.
  if (post.authorId._id !== (session.user as any).id) {
    redirect(`/blogs/${slug}`);
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-semibold text-[#E6E8EB] mb-6">
          Edit post
        </h1>
        <EditPostForm post={post} />
      </div>
    </div>
  );
}