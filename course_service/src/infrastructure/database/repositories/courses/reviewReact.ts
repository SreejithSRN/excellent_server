import { Types } from "mongoose";
import { Review } from "../../models/reviewModel";

export const reviewReact = async (
  Id: string,
  type: string,
  studentId: string
): Promise<boolean> => {
  try {
    if (type !== "like" && type !== "dislike") {
      throw new Error("Invalid reaction type");
    }

    // Type cast to enforce safety
    const validType = type as "like" | "dislike";

    const review = await Review.findById(Id);
    if (!review) throw new Error("Review not found");

    const otherType = validType === "like" ? "dislike" : "like";

    const studentObjectId = new Types.ObjectId(studentId);

    const alreadyReacted = review.reactions[validType].some(
      (sid) => sid.toString() === studentId
    );

    if (alreadyReacted) {
      review.reactions[validType] = review.reactions[validType].filter(
        (sid) => sid.toString() !== studentId
      );
    } else {
      review.reactions[validType].push(studentObjectId);
      review.reactions[otherType] = review.reactions[otherType].filter(
        (sid) => sid.toString() !== studentId
      );
    }

    await review.save();
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
