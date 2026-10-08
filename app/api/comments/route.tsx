import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import { auth } from "@/auth";
import { createCommentSchema } from "@/schemas/comment";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to comment" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const parsed = createCommentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { content, postId } = parsed.data;

    const comment = await Comment.create({
      content,
      postId,
      authorId: (session.user as any).id,
    });

    const populated = await comment.populate("authorId", "name username image");

    return NextResponse.json({ success: true, data: populated }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to add comment", error: error.message },
      { status: 500 }
    );
  }
}