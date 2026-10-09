"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = confirm("Delete this post? This cannot be undone.");
    if (!confirmed) return;

    setLoading(true);
    const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
    setLoading(false);

    if (res.ok) {
      router.push("/blogs");
      router.refresh();
    } else {
      alert("Failed to delete post");
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-red-400 hover:text-red-300 border border-red-400/30 hover:border-red-400/50 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}