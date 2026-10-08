import mongoose, { Schema, models, model } from "mongoose";

export interface IBookmark {
  userId: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const BookmarkSchema = new Schema<IBookmark>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
});

// A user can only bookmark a post once
BookmarkSchema.index({ userId: 1, postId: 1 }, { unique: true });

// Fast lookup: "all posts this user bookmarked" (for /bookmarks page)
BookmarkSchema.index({ userId: 1 });

const Bookmark = models.Bookmark || model<IBookmark>("Bookmark", BookmarkSchema);

export default Bookmark;