import mongoose, { Schema, models, model } from "mongoose";

export interface ICommunity {
  name: string;
  slug: string;
  description: string;
  topics: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommunitySchema = new Schema<ICommunity>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, required: true, maxlength: 500 },
    topics: { type: [String], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Support fast lookups by slug (used constantly: /communities/[slug])
//CommunitySchema.index({ slug: 1 });

// Support search by name/description later
CommunitySchema.index({ name: "text", description: "text" });

const Community = models.Community || model<ICommunity>("Community", CommunitySchema);

export default Community;