import { Types } from 'mongoose';
import { ReviewEntity } from '../../../../domain/entities/reviewEntity';
import { Review } from '../../models/reviewModel';

export const getReview = async (courseId: string): Promise<ReviewEntity[]> => {
  try {
    console.log(courseId, "Fetching reviews for course");

    const reviews = await Review.find({ courseRef: new Types.ObjectId(courseId) })
      .populate({
        path: 'comments.userRef',
        select: 'name', 
      });

      // console.log(reviews.comments[0],"tatatatatatatatatat")

    return reviews;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching reviews");
  }
};
