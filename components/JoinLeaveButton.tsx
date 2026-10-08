"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function JoinLeaveButton({
  communityId,
  initialIsMember,
  isSignedIn,
}: {
  communityId: string;
  initialIsMember: boolean;
  isSignedIn: boolean;
}) {
  const router = useRouter();
  const [isMember, setIsMember] = useState(initialIsMember);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isSignedIn) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const method = isMember ? "DELETE" : "POST";

    const res = await fetch(`/api/communities/${communityId}/join`, { method });

    if (res.ok) {
      setIsMember(!isMember);
      router.refresh(); // updates member count from the server
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`text-sm rounded-lg px-4 py-2 transition-colors disabled:opacity-50 ${
        isMember
          ? "border border-[#232733] text-[#8B92A3] hover:text-red-400 hover:border-red-400/40"
          : "bg-[#7C6FF5] hover:bg-[#6558E0] text-white"
      }`}
    >
      {loading ? "..." : isMember ? "Leave" : "Join"}
    </button>
  );
}