import { Types } from "mongoose";
import { Review } from "../../models/reviewModel";

export const reviewComment = async (
  reviewId: string,
  commentText: string,
  studentId: string
): Promise<boolean> => {
  try {
    

    reviewId = reviewId.trim();
    studentId = studentId.trim();

    if (
      !Types.ObjectId.isValid(reviewId) ||
      !Types.ObjectId.isValid(studentId)
    ) {
      throw new Error("Invalid reviewId or studentId");
    }

    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error("Review not found");
    }

    review.comments.push({
      userRef: new Types.ObjectId(studentId),
      commentText,
      createdAt: new Date(),
    });

    await review.save();

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
