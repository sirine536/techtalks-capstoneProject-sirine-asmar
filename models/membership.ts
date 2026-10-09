import mongoose, { Schema, models, model } from "mongoose";

export interface IMembership {
  userId: mongoose.Types.ObjectId;
  communityId: mongoose.Types.ObjectId;
  joinedAt: Date;
}

const MembershipSchema = new Schema<IMembership>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  communityId: { type: Schema.Types.ObjectId, ref: "Community", required: true },
  joinedAt: { type: Date, default: Date.now },
});

// A user can only join a community once — compound unique index
MembershipSchema.index({ userId: 1, communityId: 1 }, { unique: true });

// Fast lookup: "all communities this user joined"
MembershipSchema.index({ userId: 1 });

// Fast lookup: "all members of this community"
MembershipSchema.index({ communityId: 1 });

const Membership = models.Membership || model<IMembership>("Membership", MembershipSchema);

export default Membership;