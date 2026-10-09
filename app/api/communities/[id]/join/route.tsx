import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Membership from "@/models/membership";
import Community from "@/models/community";
import { auth } from "@/auth";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in to join a community" },
        { status: 401 }
      );
    }

    await connectDB();
    const { id } = await params;

    const community = await Community.findById(id);
    if (!community) {
      return NextResponse.json(
        { success: false, message: "Community not found" },
        { status: 404 }
      );
    }

    const userId = (session.user as any).id;

    const existing = await Membership.findOne({ userId, communityId: id });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "You are already a member" },
        { status: 400 }
      );
    }

    await Membership.create({ userId, communityId: id });

    return NextResponse.json({ success: true, message: "Joined community" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to join community", error: error.message },
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

    await Membership.findOneAndDelete({ userId, communityId: id });

    return NextResponse.json({ success: true, message: "Left community" });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to leave community", error: error.message },
      { status: 500 }
    );
  }
}