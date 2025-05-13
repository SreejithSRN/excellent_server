import { UserEntity } from "../../../domain/entities";
import { User } from "../models";

export const findByEmail = async (
  email: string
): Promise<UserEntity | null> => {
  try {
    const userExist = await User.findOne({ email })
    return userExist;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
