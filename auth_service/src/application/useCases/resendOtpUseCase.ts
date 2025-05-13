import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const resendOtpUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createOtp },
  } = dependencies;
  return {
    execute: async (email: string, otp: string | number) => {
      try {
        return await createOtp(email, otp);
      } catch (error: constant) {
        throw new Error(
          error?.message || "Something went wrong with resent otp method"
        );
      }
    },
  };
};
