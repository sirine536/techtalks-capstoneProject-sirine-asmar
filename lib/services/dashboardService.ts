import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import Bookmark from "@/models/Bookmark";
import Membership from "@/models/membership";
import Follow from "@/models/Follow";
import "@/models/user";
import "@/models/community";

export async function getDashboardData(userId: string) {
  await connectDB();

  const [
    postsCount,
    bookmarksCount,
    communitiesCount,
    followersCount,
    recentPosts,
    myPostIds,
  ] = await Promise.all([
    Post.countDocuments({ authorId: userId }),
    Bookmark.countDocuments({ userId }),
    Membership.countDocuments({ userId }),
    Follow.countDocuments({ followingId: userId }),
    Post.find({ authorId: userId })
      .populate("communityId", "name slug")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
    Post.find({ authorId: userId }).select("_id").lean(),
  ]);

  // Latest comments written by OTHER people on MY posts
  const recentComments =
    myPostIds.length === 0
      ? []
      : await Comment.find({
          postId: { $in: myPostIds.map((p: any) => p._id) },
          authorId: { $ne: userId },
        })
          .populate("authorId", "name username image")
          .populate("postId", "title slug")
          .sort({ createdAt: -1 })
          .limit(5)
          .lean();

  return JSON.parse(
    JSON.stringify({
      stats: { postsCount, bookmarksCount, communitiesCount, followersCount },
      recentPosts,
      recentComments,
    })
  );
}