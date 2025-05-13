import { OTP } from "../models";

export const createOtp = async (
  email: string,
  otp: string | number
): Promise<boolean | null> => {
  try {
    const otpExist = await OTP.findOne({ email });
    let res;
    if (otpExist) {
      res = await OTP.updateOne(
        { email },
        { $set: { otp, createdAt: Date.now() } }
      );
    } else {
      res = await OTP.create({ email, otp });
    }
    if (!res) {
      throw new Error("Otp creation?update failed");
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
