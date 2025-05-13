import { PasswordChangeEntity } from "../../../domain/entities";
import { User } from "../models";

export const passwordChange = async (
  data: PasswordChangeEntity
): Promise<boolean | null | string> => {
  try {
    const result = await User.findOneAndUpdate(
      { email: data.email },
      { $set: { password: data.newPassword } },
      { new: true }
    );
    console.log(result, "I am in the repository of password change now");

    if (result) {
      return true;
    } else {
      return "User not found";
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
