import { connectDB } from "@/lib/db";
import Bookmark from "@/models/Bookmark";
import Post from "@/models/Post";

export async function isBookmarked(userId: string, postId: string) {
  await connectDB();
  const bookmark = await Bookmark.exists({ userId, postId });
  return !!bookmark;
}

export async function getUserBookmarks(userId: string) {
  await connectDB();
  const bookmarks = await Bookmark.find({ userId }).sort({ createdAt: -1 }).lean();
  const postIds = bookmarks.map((b: any) => b.postId);

  const posts = await Post.find({ _id: { $in: postIds } })
    .populate("authorId", "name username")
    .populate("communityId", "name slug")
    .lean();

  return JSON.parse(JSON.stringify(posts));
}