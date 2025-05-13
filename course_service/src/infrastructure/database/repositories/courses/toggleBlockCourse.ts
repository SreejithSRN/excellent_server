import { Course } from "../../models";

export const toggleBlockCourse = async (
  id: string
): Promise<boolean | null | string> => {
  try {
    const result = await Course.findById(id);
    if (!result) {
      return null;
    }
    result.isBlocked = !result.isBlocked;
    await result.save();
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
