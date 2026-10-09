import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/models/Comment";
import { auth } from "@/auth";

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
    const comment = await Comment.findById(id);

    if (!comment) {
      return NextResponse.json(
        { success: false, message: "Comment not found" },
        { status: 404 }
      );
    }

    if (comment.authorId.toString() !== (session.user as any).id) {
      return NextResponse.json(
        { success: false, message: "You can only delete your own comments" },
        { status: 403 }
      );
    }

    await comment.deleteOne();

    return NextResponse.json({ success: true, message: "Comment deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to delete comment", error: error.message },
      { status: 500 }
    );
  }
}