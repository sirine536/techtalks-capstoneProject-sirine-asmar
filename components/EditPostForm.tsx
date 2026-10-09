"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditPostForm({ post }: { post: any }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags?.join(", ") || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch(`/api/posts/${post._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.message || "Something went wrong");
      return;
    }

    router.push(`/blogs/${post.slug}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
        className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
        required
        rows={10}
        className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
      />

      <input
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2 justify-end pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm text-[#8B92A3] hover:text-[#E6E8EB] px-4 py-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="text-sm bg-[#7C6FF5] hover:bg-[#6558E0] disabled:opacity-50 text-white rounded-lg px-4 py-2 transition-colors"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </div>
    </form>
  );
}