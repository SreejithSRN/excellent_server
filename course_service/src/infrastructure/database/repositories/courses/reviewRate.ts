
import { ReviewRate, ReviewRateResponse } from "../../../../domain/entities/reviewEntity";
import { Review } from "../../models/reviewModel";

export const reviewRate = async (data: ReviewRate):Promise<ReviewRateResponse> => {
  try {
    // Check if the user has already reviewed the course
    const existingReview = await Review.findOne({
      courseRef: data.courseRef,
      userRef: data.userRef,
    });

    if (existingReview) {
      return {
        success: false,
        message: "You have already reviewed this course.",
      };
    }

    // Create the review
    const newReview = await Review.create({
      courseRef: data.courseRef,
      userRef: data.userRef,
      rating: data.rating,
      reviewText: data.reviewText,
      reactions: { like: [], dislike: [] },
      comments: [],
    });

    return {
      success: true,
      message: "Review submitted successfully.",
      review: newReview,
    };

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
