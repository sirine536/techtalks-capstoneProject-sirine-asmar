import mongoose, { Schema, models, model } from "mongoose";

export interface IComment {
  content: string;
  postId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    content: { type: String, required: true, maxlength: 1000 },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Fast lookup: "all comments on this post, oldest first"
CommentSchema.index({ postId: 1, createdAt: 1 });

const Comment = models.Comment || model<IComment>("Comment", CommentSchema);

export default Comment;