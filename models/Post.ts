import mongoose, { Schema, models, model } from "mongoose";

export interface IPost {
  title: string;
  slug: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  communityId: mongoose.Types.ObjectId;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    communityId: { type: Schema.Types.ObjectId, ref: "Community", required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Fast lookup by slug: /blogs/[slug]
//PostSchema.index({ slug: 1 });

// Fast lookup: "all posts by this author" and "all posts in this community"
PostSchema.index({ authorId: 1 });
PostSchema.index({ communityId: 1 });

// Support "newest posts" queries
PostSchema.index({ createdAt: -1 });

// Full-text search across title + content
PostSchema.index({ title: "text", content: "text" });

const Post = models.Post || model<IPost>("Post", PostSchema);

export default Post;