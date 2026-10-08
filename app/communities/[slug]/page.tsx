import { notFound } from "next/navigation";
import { auth } from "@/auth";
import {
  getCommunityBySlug,
  isMember,
  getMemberCount,
} from "@/lib/services/communityService";
import JoinLeaveButton from "@/components/JoinLeaveButton";

export default async function CommunityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const community = await getCommunityBySlug(slug);

  if (!community) {
    notFound();
  }

  const session = await auth();
  const userId = session?.user ? (session.user as any).id : null;

  const [memberCount, userIsMember] = await Promise.all([
    getMemberCount(community._id),
    userId ? isMember(userId, community._id) : Promise.resolve(false),
  ]);

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#12151C] border border-[#232733] rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#E6E8EB]">
                {community.name}
              </h1>
              <p className="text-sm text-[#8B92A3] mt-2">
                {community.description}
              </p>
            </div>
            <JoinLeaveButton
              communityId={community._id}
              initialIsMember={userIsMember}
              isSignedIn={!!session?.user}
            />
          </div>

          <div className="flex items-center gap-4 mt-4 text-sm text-[#8B92A3]">
            <span>{memberCount} {memberCount === 1 ? "member" : "members"}</span>
          </div>

          {community.topics?.length > 0 && (
            <div className="flex gap-2 mt-4 flex-wrap">
              {community.topics.map((topic: string) => (
                <span
                  key={topic}
                  className="text-xs font-mono text-[#7C6FF5] bg-[#7C6FF5]/10 px-2 py-1 rounded-md"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-[#8B92A3]">
          No posts in this community yet.
        </div>
      </div>
    </div>
  );
}