import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const verifyOtpUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { verifyOtp },
  } = dependencies;

  return {
    execute: async (otp: string | number,email:string) => {
      try {        
        return await verifyOtp(otp,email);
      } catch (error: constant) {
        throw new Error(
          error?.message ||
            "Verify otp process failed due to some unknown error"
        );
      }
    },
  };
};
