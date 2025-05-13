import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { constant } from "../../_lib/common/constant";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import userCreatedProducer from "../../infrastructure/kafka/producer/userCreatedProducer";

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
          .json({ success: false, message: "Otp mismatch please try again!" });
        return;
      }
      const newUser = await createUserUseCase(dependencies).execute(data);

      if (!newUser) {
        res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ success: false, message: "User Creation failed" });
        return;
      }
      await userCreatedProducer(newUser)
      console.log("I reached here after kafka produce")

      res.status(httpStatusCode.OK).json({
        success: true,
        message: "User Creation Successfully",
        data: newUser,
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };
};
