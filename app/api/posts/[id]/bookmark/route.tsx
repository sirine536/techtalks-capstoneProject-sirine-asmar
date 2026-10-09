import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Bookmark from "@/models/Bookmark";
import { auth } from "@/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to bookmark posts" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const userId = (session.user as any).id;

    const existing = await Bookmark.findOne({ userId, postId: id });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Already bookmarked" },
        { status: 400 }
      );
    }

    await Bookmark.create({ userId, postId: id });

    return NextResponse.json({ success: true, message: "Bookmarked" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to bookmark post", error: error.message },
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
    const userId = (session.user as any).id;

    await Bookmark.findOneAndDelete({ userId, postId: id });

    return NextResponse.json({ success: true, message: "Bookmark removed" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to remove bookmark", error: error.message },
      { status: 500 }
    );
  }
}