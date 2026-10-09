import { connectDB } from "@/lib/db";
import Community from  '../../models/community' ;
import Membership from "../../models/membership";


export async function getCommunities(search?: string, page = 1, limit = 10) {
  await connectDB();

  const query: any = {};
  if (search) {
    query.$text = { $search: search };
  }

  const communities = await Community.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean();

  const total = await Community.countDocuments(query);

  return {
    communities: JSON.parse(JSON.stringify(communities)), // strip Mongoose internals for Server Components
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };

  
}



export async function getCommunityBySlug(slug: string) {
  await connectDB();
  const community = await Community.findOne({ slug }).lean();
  return community ? JSON.parse(JSON.stringify(community)) : null;
}

export async function isMember(userId: string, communityId: string) {
  await connectDB();
  const membership = await Membership.exists({ userId, communityId });
  return !!membership;
}

export async function getMemberCount(communityId: string) {
  await connectDB();
  return Membership.countDocuments({ communityId });
}
export async function getFeaturedCommunities(limit = 6) {
  await connectDB();
  const communities = await Community.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(communities));
}