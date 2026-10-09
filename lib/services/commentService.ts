import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import community from "@/models/community";

export async function getCommentsByPost(postId: string) {
  await connectDB();
  const comments = await Comment.find({ postId })
    .populate("authorId", "name username image")
    .sort({ createdAt: 1 })
    .lean();

  return JSON.parse(JSON.stringify(comments));
}
