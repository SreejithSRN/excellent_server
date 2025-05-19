import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

export const getUserDataController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;

  const { findByEmailUseCase } = useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error(messages.UNAUTHORIZED);
      }

      const response = await findByEmailUseCase(dependencies).execute(
        req.user.email
      );
      console.log("hai iam here in getuserdata controller", response);
      if (!response) {
        throw new Error(messages.Not_Found);
      }

      res
        .status(httpStatusCode.OK)
        .json({ success: true, data: response, message: messages.Exists });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
