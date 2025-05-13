import { OTP } from "../models";

export const verifyOtp = async (
  otp: string | number,
  email: string
): Promise<boolean | null> => {
  try {
    const result = await OTP.findOne({ email, otp });
    return result ? true : false;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("something went wrong in otp verification");
    }
    return false;
  }
};
