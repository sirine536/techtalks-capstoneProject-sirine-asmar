"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CommentSection({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: any[];
}) {
  const router = useRouter();
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, postId }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    setComments([...comments, data.data]);
    setContent("");
    router.refresh();
  }

  return (
    <div>
      <h2 className="text-[#E6E8EB] font-medium mb-4">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h2>

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
        />
        {error && <p className="text-sm text-red-400 mt-1">{error}</p>}
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="mt-2 text-sm bg-[#7C6FF5] hover:bg-[#6558E0] disabled:opacity-50 text-white rounded-lg px-4 py-2 transition-colors"
        >
          {loading ? "Posting..." : "Comment"}
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((c: any) => (
          <div key={c._id} className="border-b border-[#232733] pb-4">
            <p className="text-sm text-[#E6E8EB] font-medium">
              {c.authorId?.name}
            </p>
            <p className="text-sm text-[#8B92A3] mt-1">{c.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}