import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { auth } from "@/auth";
import { createPostSchema } from "@/schemas/post";
import { generateUniqueSlug } from "@/lib/generateSlug";
import { getPosts } from "@/lib/services/postService";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    const result = await getPosts({
      search: searchParams.get("search") || undefined,
      community: searchParams.get("community") || undefined,
      author: searchParams.get("author") || undefined,
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "10"),
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch posts", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to create a post" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const parsed = createPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { title, content, communityId, tags } = parsed.data;
    const slug = await generateUniqueSlug(Post, title);

    const post = await Post.create({
      title,
      content,
      communityId,
      tags,
      slug,
      authorId: (session.user as any).id,
    });

    return NextResponse.json({ success: true, data: post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to create post", error: error.message },
      { status: 500 }
    );
  }
}