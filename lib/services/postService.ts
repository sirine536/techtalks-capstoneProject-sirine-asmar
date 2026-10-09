// import { connectDB } from "@/lib/db";
// import Post from "@/models/Post";


// import community from "@/models/community"; 
// import "@/models/user"; // populate authorId محتاج User schema مسجلة)
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import "@/models/community"; // نسجل الـ schema فقط، ما بنحتاج نستخدم المتغير مباشرة
import "@/models/user";
export async function getPosts(options: {
  search?: string;
  community?: string;
  author?: string;
  page?: number;
  limit?: number;
}) {
  await connectDB();

  const { search, community, author, page = 1, limit = 10 } = options;
  const query: any = {};

  if (search) query.$text = { $search: search };
  if (community) query.communityId = community;
  if (author) query.authorId = author;

  const posts = await Post.find(query)
    .populate("authorId", "name username image")
    .populate("communityId", "name slug")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await Post.countDocuments(query);

  return {
    posts: JSON.parse(JSON.stringify(posts)),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
}

export async function getPostBySlug(slug: string) {
  await connectDB();
  const post = await Post.findOne({ slug })
    .populate("authorId", "name username image")
    .populate("communityId", "name slug")
    .lean();

  return post ? JSON.parse(JSON.stringify(post)) : null;
}
export async function getLatestPosts(limit = 3) {
  await connectDB();
  const posts = await Post.find({})
    .populate("authorId", "name username image")
    .populate("communityId", "name slug")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(posts));
}
export async function getTrendingTags(limit = 5) {
  await connectDB();
  const result = await Post.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: limit },
  ]);
  return result.map((r) => ({ tag: r._id, count: r.count }));
}