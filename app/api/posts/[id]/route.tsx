import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Post from "@/models/Post";
import { auth } from "@/auth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    // OWNERSHIP CHECK — this is the core security rule from the document:
    // "Do not trust role/owner IDs from the browser. Check permissions on
    // the server near the data mutation."
    if (post.authorId.toString() !== (session.user as any).id) {
      return NextResponse.json(
        { success: false, message: "You can only edit your own posts" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, content, tags } = body;

    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;
    await post.save();

    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to update post", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    if (post.authorId.toString() !== (session.user as any).id) {
      return NextResponse.json(
        { success: false, message: "You can only delete your own posts" },
        { status: 403 }
      );
    }

    await post.deleteOne();

    return NextResponse.json({ success: true, message: "Post deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to delete post", error: error.message },
      { status: 500 }
    );
  }
}