import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { constant } from "../../_lib/common/constant";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import userCreatedProducer from "../../infrastructure/kafka/producer/userCreatedProducer";
import { messages } from "../../_lib/common/messages";

export const verifyOtpController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const { verifyOtpUseCase, createUserUseCase } = useCases;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { otp, data } = req.body;
      const result = await verifyOtpUseCase(dependencies).execute(
        otp,
        data.email
      );

      if (!result) {
        res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ success: false, message: messages.OTP_Mismatch});
        return;
      }
      const newUser = await createUserUseCase(dependencies).execute(data);

      if (!newUser) {
        res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ success: false, message: messages.User_Create_Failed });
        return;
      }
      await userCreatedProducer(newUser) 

      res.status(httpStatusCode.OK).json({
        success: true,
        message: messages.User_Create_Success,
        data: newUser,
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
