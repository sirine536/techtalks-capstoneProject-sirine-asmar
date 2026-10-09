"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FollowButton({
  targetUserId,
  initialIsFollowing,
  isSignedIn,
}: {
  targetUserId: string;
  initialIsFollowing: boolean;
  isSignedIn: boolean;
}) {
  const router = useRouter();
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isSignedIn) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const method = isFollowing ? "DELETE" : "POST";
    const res = await fetch(`/api/users/${targetUserId}/follow`, { method });

    if (res.ok) {
      setIsFollowing(!isFollowing);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
        isFollowing
          ? "border border-[#232733] text-[#8B92A3] hover:border-red-400/40 hover:text-red-400"
          : "bg-[#7C6FF5] text-white hover:bg-[#6558E0]"
      }`}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}