"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BookmarkButton({
  postId,
  initialIsBookmarked,
  isSignedIn,
}: {
  postId: string;
  initialIsBookmarked: boolean;
  isSignedIn: boolean;
}) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isSignedIn) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const method = isBookmarked ? "DELETE" : "POST";
    const res = await fetch(`/api/posts/${postId}/bookmark`, { method });

    if (res.ok) {
      setIsBookmarked(!isBookmarked);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`text-sm rounded-lg px-4 py-2 transition-colors disabled:opacity-50 ${
        isBookmarked
          ? "bg-[#7C6FF5]/10 text-[#7C6FF5] border border-[#7C6FF5]/40"
          : "border border-[#232733] text-[#8B92A3] hover:text-[#E6E8EB]"
      }`}
    >
      {loading ? "..." : isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
    </button>
  );
}