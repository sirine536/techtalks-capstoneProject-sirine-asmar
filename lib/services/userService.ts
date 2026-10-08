import { connectDB } from "@/lib/db";
import User from "@/models/user";
import Post from "@/models/Post";
import Membership from "@/models/membership";
import "@/models/community";

export async function getUserByUsername(username: string) {
  await connectDB();
  const user = await User.findOne({ username }).lean();
  return user ? JSON.parse(JSON.stringify(user)) : null;
}

export async function getUserPosts(userId: string) {
  await connectDB();
  const posts = await Post.find({ authorId: userId })
    .populate("communityId", "name slug")
    .sort({ createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(posts));
}

export async function getUserCommunities(userId: string) {
  await connectDB();
  const memberships = await Membership.find({ userId })
    .populate("communityId", "name slug")
    .lean();
  return JSON.parse(JSON.stringify(memberships.map((m: any) => m.communityId)));
}
export async function getUserCommunitiesCount(userId: string) {
  await connectDB();
  return Membership.countDocuments({ userId });
}

export async function getUserPostsCount(userId: string) {
  await connectDB();
  return Post.countDocuments({ authorId: userId });
}
import Follow from "@/models/Follow";

export async function getFollowCounts(userId: string) {
  await connectDB();
  const [followers, following] = await Promise.all([
    Follow.countDocuments({ followingId: userId }),
    Follow.countDocuments({ followerId: userId }),
  ]);
  return { followers, following };
}

export async function isFollowing(followerId: string, followingId: string) {
  await connectDB();
  const follow = await Follow.exists({ followerId, followingId });
  return !!follow;
}