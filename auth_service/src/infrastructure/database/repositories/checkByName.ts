import { User } from "../models";

export const checkByName = async (name: string): Promise<boolean> => {
  try {
    const userNameExist = await User.findOne({ name });
    if (userNameExist) {
      return true;
    }
    return false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
