import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Community from "@/models/community";
import { auth } from "@/auth";
import { createCommunitySchema } from "@/schemas/community";
//import { generateUniqueSlug } from "@/lib/generateSlug";

// export async function GET(req: NextRequest) {
//   try {
//     await connectDB();

//     const searchParams = req.nextUrl.searchParams;
//     const search = searchParams.get("search");
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");

//     const query: any = {};
//     if (search) {
//       query.$text = { $search: search };
//     }

//     const communities = await Community.find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .lean();

//     const total = await Community.countDocuments(query);

//     return NextResponse.json({
//       success: true,
//       data: communities,
//       pagination: { page, limit, total, pages: Math.ceil(total / limit) },
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch communities", error: error.message },
//       { status: 500 }
//     );
//   }
// }
import { generateUniqueSlug } from "@/lib/generateSlug";
import community from "@/models/community";

import { getCommunities } from "@/lib/services/communityService";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get("search") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const result = await getCommunities(search, page, limit);

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch communities", error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to create a community" },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();
    const parsed = createCommunitySchema.safeParse(body);
if (!parsed.success) {
  return NextResponse.json(
    { success: false, message: "Validation failed", errors:parsed.error.flatten().fieldErrors },
    { status: 400 }
  );
}

    const { name, description, topics } = parsed.data;
   const slug = await generateUniqueSlug(Community, name);

    const community = await Community.create({
      name,
      description,
      topics,
      slug,
      createdBy: (session.user as any).id,
    });

    return NextResponse.json({ success: true, data: community }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to create community", error: error.message },
      { status: 500 }
    );
  }
}