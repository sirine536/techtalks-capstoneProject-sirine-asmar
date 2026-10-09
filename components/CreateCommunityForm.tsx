"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCommunityForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topics, setTopics] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/communities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        topics: topics.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    const data = await res.json();
    setLoading(false);

//     if (!res.ok) {
// console.log("Validation errors:", data.errors);
//       setError(data.message || "Something went wrong");
//       return;
//     }

if (!res.ok) {
  // Grab the first validation error message if there are field errors,
  // otherwise fall back to the general message
  const firstFieldError = data.errors
    ? (Object.values(data.errors)[0] as string[])?.[0]
    : null;
  setError(firstFieldError || data.message || "Something went wrong");
  return;
}

    setIsOpen(false);
    setName("");
    setDescription("");
    setTopics("");
    router.refresh(); // re-fetch the Server Component data
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm bg-[#7C6FF5] hover:bg-[#6558E0] text-white rounded-lg px-4 py-2 transition-colors"
      >
        Create community
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-[#12151C] border border-[#232733] rounded-xl p-6 w-full max-w-md">
        <h2 className="text-[#E6E8EB] font-medium mb-4">Create a community</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Community name"
            required
            className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            rows={3}
            className="w-full bg-[#1C1F26] border border-[#232733] rounded-lg px-3 py-2 text-sm text-[#E6E8EB] placeholder:text-[#8B92A3] outline-none focus:border-[#7C6FF5]"
          />
          <input
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Topics (comma separated: react, nextjs)"
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
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}