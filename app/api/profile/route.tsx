import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user";
import { auth } from "@/auth";
import { updateProfileSchema } from "@/schemas/user";

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "You must be signed in" },
        { status: 401 }
      );
    }

    await connectDB();
    const body = await req.json();
    const parsed = updateProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { bio, skills } = parsed.data;
    const userId = (session.user as any).id;

    // Note: no need to check ownership here beyond "is this the signed-in
    // user" — a user can only ever update their OWN profile via this
    // endpoint, since we always use the session's userId, never an id
    // passed from the client.
    const updated = await User.findByIdAndUpdate(
      userId,
      { ...(bio !== undefined && { bio }), ...(skills !== undefined && { skills }) },
     // { new: true }
     { returnDocument: "after" }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to update profile", error: error.message },
      { status: 500 }
    );
  }
}