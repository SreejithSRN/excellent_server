import { constant } from "../../../_lib/common/constant";
import { UserEntity } from "../../../domain/entities";
import { User } from "../models";

export const profileEdit = async (
  data: constant
): Promise<UserEntity | null> => {
  try {   
    const updatedUser = await User.findOneAndUpdate(
      { email: data.email },
      {
        $set: {
          firstName: data.firstName,
          lastName: data.lastName,
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role,
          profile: data.profile,
          contact: data.contact,
          profession: data.profession || "not working",
          cv: data.cv,
          isOtpVerified: true,
          isVerified: data.isVerified,
          isBlocked: data.isBlocked,
          isRequested: data.isRequested,
          isGAuth: data.isGAuth,
          isRejected: data.isRejected,
          lastLoginDate: data.lastLoginDate,
          loginStreak: data.loginStreak,
          weeklyLogins: data.weeklyLogins,
        },
      },
      {
        upsert: true, 
        runValidators: true, 
        new: true,
      }
    );   

    if (updatedUser) {
      return updatedUser;
    } else {
      return null;
    }
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
