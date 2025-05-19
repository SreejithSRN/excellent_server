import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { generateOTP } from "../../_lib/utility/otp/generateOtp";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { sendOTP } from "../../_lib/utility/otp/sendOtp";
import { messages } from "../../_lib/common/messages";

export const resendOtpController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const { resendOtpUseCase } = useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const otp: string | number = await generateOTP();
      const result = await resendOtpUseCase(dependencies).execute(email, otp);
      console.log("your current otp =>", otp);

      if (!result) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          data: {},
          message: messages.OTP_Failed,
        });
      } else {
        await sendOTP(email,otp)
        res.status(httpStatusCode.OK).json({
          success: true,
          data: {},
          message: messages.OTP_Success,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
