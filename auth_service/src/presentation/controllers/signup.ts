import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { hashPassword } from "../../_lib/utility/bcrypt/hashpassword";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { generateOTP } from "../../_lib/utility/otp/generateOtp";
import { sendOTP } from "../../_lib/utility/otp/sendOtp";

export const signupController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const { createOtpUseCase, findByEmailUseCase, checkByNameUseCase } = useCases;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      req.body.password = await hashPassword(req.body.password);
      const { email, name, password, role } = req.body;

      const emailResult = await findByEmailUseCase(dependencies).execute(email);
      if (emailResult) {
        res.status(httpStatusCode.CONFLICT).json({
          success: false,
          message: "Email already registered. Try alternative",
        });
        return;
      }

      const nameResult = await checkByNameUseCase(dependencies).execute(name);
      if (nameResult) {
        res.status(httpStatusCode.CONFLICT).json({
          success: false,
          message: "UserName already taken. Try alternative",
        });
        return;
      }

      const otp: string | number = await generateOTP();
      console.log("Your Current OTP =>", otp);

      const otpCreate = await createOtpUseCase(dependencies).execute(
        email,
        otp
      );

      delete req.body.confirmPassword;
      console.log(req.body);

      if (!otpCreate) {
        res
          .status(httpStatusCode.INTERNAL_SERVER_ERROR)
          .json({ success: false, message: "Otp creation failed" });
      } else {
        await sendOTP(email,otp)
        res
          .status(httpStatusCode.OK)
          .json({ success: true, message: "Otp Created", data: req.body });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };
};
