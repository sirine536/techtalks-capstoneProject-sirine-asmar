import mongoose, { Schema, models, model } from "mongoose";

export interface IFollow {
  followerId: mongoose.Types.ObjectId; // the user who is following
  followingId: mongoose.Types.ObjectId; // the user being followed
  createdAt: Date;
}

const FollowSchema = new Schema<IFollow>({
  followerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  followingId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

// A user can only follow another user once
FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

// Fast lookup: "who does this user follow" and "who follows this user"
FollowSchema.index({ followerId: 1 });
FollowSchema.index({ followingId: 1 });

const Follow = models.Follow || model<IFollow>("Follow", FollowSchema);

export default Follow;