import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Follow from "@/models/Follow";
import { auth } from "@/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to follow users" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;
    const followerId = (session.user as any).id;

    if (followerId === id) {
      return NextResponse.json(
        { success: false, message: "You cannot follow yourself" },
        { status: 400 }
      );
    }

    const existing = await Follow.findOne({ followerId, followingId: id });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "Already following" },
        { status: 400 }
      );
    }

    await Follow.create({ followerId, followingId: id });

    return NextResponse.json({ success: true, message: "Followed" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to follow user", error: error.message },
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
    const followerId = (session.user as any).id;

    await Follow.findOneAndDelete({ followerId, followingId: id });

    return NextResponse.json({ success: true, message: "Unfollowed" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to unfollow user", error: error.message },
      { status: 500 }
    );
  }
}