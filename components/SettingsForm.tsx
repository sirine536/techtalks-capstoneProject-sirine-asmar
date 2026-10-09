"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SettingsForm({ user }: { user: any }) {
  const router = useRouter();
  const [bio, setBio] = useState(user?.bio || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio,
        skills: skills.split(",").map((s: string) => s.trim()).filter(Boolean),
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

    setSuccess(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-[#8B92A3] mb-1.5 block">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell others about yourself..."
          rows={4}
          className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
        />
      </div>

      <div>
        <label className="text-sm text-[#8B92A3] mb-1.5 block">Skills</label>
        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="React, TypeScript, Node.js"
          className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
        />
        <p className="text-xs text-[#8B92A3] mt-1">Comma separated</p>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && <p className="text-sm text-green-400">Profile updated successfully.</p>}

      <button
        type="submit"
        disabled={loading}
        className="text-sm bg-[#7C6FF5] hover:bg-[#6558E0] disabled:opacity-50 text-white rounded-lg px-4 py-2 transition-colors"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}