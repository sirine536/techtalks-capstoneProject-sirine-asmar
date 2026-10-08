"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [communities, setCommunities] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [communityId, setCommunityId] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && communities.length === 0) {
      fetch("/api/communities")
        .then((res) => res.json())
        .then((data) => setCommunities(data.communities || []));
    }
  }, [isOpen]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
        communityId,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      const firstFieldError = data.errors
        ? (Object.values(data.errors)[0] as string[])?.[0]
        : null;
      setError(firstFieldError || data.message || "Something went wrong");
      return;
    }

    setIsOpen(false);
    setTitle("");
    setContent("");
    setCommunityId("");
    setTags("");
    router.refresh();
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm bg-[#7C6FF5] hover:bg-[#6558E0] text-white rounded-lg px-4 py-2 transition-colors"
      >
        Write a post
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#12151C] border border-[#232733] rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-[#E6E8EB] font-medium mb-4">Write a post</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
            className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
          />

          <select
            value={communityId}
            onChange={(e) => setCommunityId(e.target.value)}
            required
            className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] outline-none focus:border-[#7C6FF5]"
          >
            <option value="">Select a community</option>
            {communities.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
            required
            rows={6}
            className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
          />

          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated: react, nextjs)"
            className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-sm text-[#8B92A3] hover:text-[#E6E8EB] px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="text-sm bg-[#7C6FF5] hover:bg-[#6558E0] disabled:opacity-50 text-white rounded-lg px-4 py-2 transition-colors"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}