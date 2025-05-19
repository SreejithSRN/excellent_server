import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../_lib/utility/jwt";
import { messages } from "../../_lib/common/messages";

export const loginUserController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;

  const { loginUserUseCase } = useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await loginUserUseCase(dependencies).execute(
        email,
        password
      );

      if (typeof result === "string") {
        res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ success: false, message: result });
        return;
      }

      if (result?.isBlocked) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: messages.Account_Stat,
        });
        return;
      }

      ////neeed to check the condition after the form

      if (result?.isOtpVerified && result?.isRequested && result?.isRejected) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: messages.Account_Verification,
        });
        return;
      }

      const accessToken = generateAccessToken({
        _id: String(result?._id),
        email: result?.email!,
        role: result?.role!,
      });
      const refreshToken = generateRefreshToken({
        _id: String(result?._id),
        email: result?.email!,
        role: result?.role!,
      });

      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(httpStatusCode.OK).json({
        success: true,
        data: result,
        message: messages.Login_Success,
      });

      console.log(result, "iam from login controller ...........");
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
