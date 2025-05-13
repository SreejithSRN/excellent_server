import { model, Schema, Types } from "mongoose";
import { ReviewEntity } from "../../../domain/entities/reviewEntity";


const reviewSchema = new Schema<ReviewEntity>(
  {
    courseRef: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    reactions: {
      like: [{ type: Schema.Types.ObjectId, ref: "User" ,default: [], }],
      dislike: [{ type: Schema.Types.ObjectId, ref: "User", default: [], }],
    },
    comments: [
      {
        userRef: { type: Schema.Types.ObjectId, ref: "User", required: true },
        commentText: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Ensure one review per user per course
reviewSchema.index({ courseRef: 1, userRef: 1 }, { unique: true });

export const Review = model<ReviewEntity>("Review", reviewSchema);

