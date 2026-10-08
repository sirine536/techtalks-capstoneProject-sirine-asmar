// // export default function UserProfilePage({ params }: { params: { username: string } }) {
// //   return <div>Profile of {params.username} - coming soon</div>;
// // }

// import { notFound } from "next/navigation";
// import Link from "next/link";
// import {
//   getUserByUsername,
//   getUserPosts,
//   getUserCommunities,
// } from "@/lib/services/userService";


// export const revalidate = 60;
// export default async function ProfilePage({
//   params,
// }: {
//   params: Promise<{ username: string }>;
// }) {
//   const { username } = await params;
//   const user = await getUserByUsername(username);

//   if (!user) {
//     notFound();
//   }

//   const [posts, communities] = await Promise.all([
//     getUserPosts(user._id),
//     getUserCommunities(user._id),
//   ]);

//   return (
//     <div className="min-h-screen bg-[#0B0D12] px-6 py-10">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center gap-4">
//           {user.image ? (
//             <img
//               src={user.image}
//               alt={user.name}
//               className="w-16 h-16 rounded-full"
//             />
//           ) : (
//             <div className="w-16 h-16 rounded-full bg-[#1C1F26] border border-[#232733]" />
//           )}
//           <div>
//             <h1 className="text-xl font-semibold text-[#E6E8EB]">
//               {user.name}
//             </h1>
//             <p className="text-sm font-mono text-[#8B92A3]">
//               @{user.username}
//             </p>
//           </div>
//         </div>

//         {user.bio && (
//           <p className="text-sm text-[#E6E8EB] mt-4">{user.bio}</p>
//         )}

//         {user.skills?.length > 0 && (
//           <div className="flex gap-2 mt-4 flex-wrap">
//             {user.skills.map((skill: string) => (
//               <span
//                 key={skill}
//                 className="text-xs font-mono text-[#7C6FF5] bg-[#7C6FF5]/10 px-2 py-1 rounded-md"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Communities */}
//         {communities.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-sm font-medium text-[#8B92A3] mb-3">
//               Communities
//             </h2>
//             <div className="flex gap-2 flex-wrap">
//               {communities.map((c: any) => (
//                 <Link
//                   key={c._id}
//                   href={`/communities/${c.slug}`}
//                   className="text-sm text-[#E6E8EB] border border-[#232733] hover:border-[#333844] rounded-lg px-3 py-1.5 transition-colors"
//                 >
//                   {c.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Posts */}
//         <div className="mt-10 pt-8 border-t border-[#232733]">
//           <h2 className="text-sm font-medium text-[#8B92A3] mb-4">
//             Posts ({posts.length})
//           </h2>

//           {posts.length === 0 ? (
//             <p className="text-sm text-[#8B92A3]">No posts yet.</p>
//           ) : (
//             <div className="space-y-3">
//               {posts.map((post: any) => (
//                 <Link
//                   key={post._id}
//                   href={`/blogs/${post.slug}`}
//                   className="block bg-[#12151C] border border-[#232733] hover:border-[#333844] rounded-xl p-4 transition-colors"
//                 >
//                   <span className="text-xs font-mono text-[#7C6FF5]">
//                     {post.communityId?.name}
//                   </span>
//                   <h3 className="text-[#E6E8EB] font-medium mt-1">
//                     {post.title}
//                   </h3>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import { notFound } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import {
  getUserByUsername,
  getUserPosts,
  getUserCommunities,
} from "@/lib/services/userService";
import { getTechIcon } from "@/lib/techIcons";
import PostCard from "@/components/PostCard";

import { getFollowCounts, isFollowing } from "@/lib/services/userService";
import FollowButton from "@/components/FollowButton";
export const revalidate = 60;

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  const session = await auth();
  const isOwnProfile = (session?.user as any)?.username === username;

const userId = session?.user ? (session.user as any).id : null;
const [posts, communities, followCounts, followingStatus] = await Promise.all([
  getUserPosts(user._id),
  getUserCommunities(user._id),
  getFollowCounts(user._id),
  userId && !isOwnProfile ? isFollowing(userId, user._id) : Promise.resolve(false),
]);

  // const [posts, communities] = await Promise.all([
  //   getUserPosts(user._id),
  //   getUserCommunities(user._id),
  // ]);

  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="rounded-2xl border border-[#232733] bg-[#12151C] p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="h-20 w-20 rounded-full border-2 border-[#232733]"
                />
              ) : (
                <div className="h-20 w-20 rounded-full border-2 border-[#232733] bg-[#1C1F26]" />
              )}
              <div>
                <h1 className="text-xl font-semibold text-[#E6E8EB]">
                  {user.name}
                </h1>
                <p className="text-sm font-mono text-[#8B92A3]">
                  @{user.username}
                </p>
                <p className="mt-1 text-xs text-[#8B92A3]">
                  Joined {joinedDate}
                </p>
              </div>
            </div>

           {/* // {isOwnProfile && (
              // <Link
              //   href="/settings"
              //   className="rounded-lg border border-[#232733] px-3 py-1.5 text-xs text-[#E6E8EB] transition-colors hover:border-[#7C6FF5] hover:text-[#7C6FF5]"
              // >
              //   Edit profile
              // </Link>
            )} */}
            {isOwnProfile ? (
  <Link
    href="/settings"
    className="rounded-lg border border-[#232733] px-3 py-1.5 text-xs text-[#E6E8EB] transition-colors hover:border-[#7C6FF5] hover:text-[#7C6FF5]"
  >
    Edit profile
  </Link>
) : (
  userId && (
    <FollowButton
      targetUserId={user._id}
      initialIsFollowing={followingStatus}
      isSignedIn={!!session?.user}
    />
  )
)}
          </div>

          {user.bio && (
            <p className="mt-4 text-sm leading-relaxed text-[#E6E8EB]">
              {user.bio}
            </p>
          )}

          {/* Stats */}
          {/* <div className="mt-5 grid grid-cols-4 gap-3 border-t border-[#232733] pt-4">
            <div className="rounded-lg bg-[#1C1F26] py-3 text-center">
              <p className="text-lg font-semibold text-[#E6E8EB]">
                {posts.length}
              </p>
              <p className="text-xs text-[#8B92A3]">Posts</p>
            </div>
            <div className="rounded-lg bg-[#1C1F26] py-3 text-center">
              <p className="text-lg font-semibold text-[#E6E8EB]">
                {communities.length}
              </p>
              <p className="text-xs text-[#8B92A3]">Communities</p>
            </div>
          </div> */}

<div className="mt-5 grid grid-cols-4 gap-3 border-t border-[#232733] pt-4">
  <div className="rounded-lg bg-[#1C1F26] py-3 text-center">
    <p className="text-lg font-semibold text-[#E6E8EB]">
      {posts.length}
    </p>
    <p className="text-xs text-[#8B92A3]">Posts</p>
  </div>
  <div className="rounded-lg bg-[#1C1F26] py-3 text-center">
    <p className="text-lg font-semibold text-[#E6E8EB]">
      {communities.length}
    </p>
    <p className="text-xs text-[#8B92A3]">Communities</p>
  </div>
  <div className="rounded-lg bg-[#1C1F26] py-3 text-center">
    <p className="text-lg font-semibold text-[#E6E8EB]">
      {followCounts.followers}
    </p>
    <p className="text-xs text-[#8B92A3]">Followers</p>
  </div>
  <div className="rounded-lg bg-[#1C1F26] py-3 text-center">
    <p className="text-lg font-semibold text-[#E6E8EB]">
      {followCounts.following}
    </p>
    <p className="text-xs text-[#8B92A3]">Following</p>
  </div>
</div>



          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="mt-5 border-t border-[#232733] pt-4">
              <p className="mb-2 text-xs font-medium text-[#8B92A3]">Skills</p>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="rounded-md bg-[#7C6FF5]/10 px-2 py-1 font-mono text-xs text-[#7C6FF5]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Communities */}
        {communities.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-medium text-[#8B92A3]">
              Communities
            </h2>
            <div className="flex flex-wrap gap-2">
              {communities.map((c: any) => {
                const { icon: Icon, bg, color } = getTechIcon(c.name);
                return (
                  <Link
                    key={c._id}
                    href={`/communities/${c.slug}`}
                    className="flex items-center gap-2 rounded-lg border border-[#232733] px-3 py-1.5 text-sm text-[#E6E8EB] transition-colors hover:border-[#333844]"
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded ${bg}`}>
                      <Icon size={11} className={color} />
                    </span>
                    {c.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="mt-8 border-t border-[#232733] pt-6">
          <h2 className="mb-4 text-sm font-medium text-[#8B92A3]">
            Posts ({posts.length})
          </h2>

          {posts.length === 0 ? (
            <p className="text-sm text-[#8B92A3]">No posts yet.</p>
          ) : (
            <div className="space-y-3">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}