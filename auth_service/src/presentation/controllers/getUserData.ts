import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const getUserDataController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;

  const { findByEmailUseCase } = useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new Error("Authentication required:please provide user details");
      }

      const response = await findByEmailUseCase(dependencies).execute(
        req.user.email
      );
      console.log("hai iam here in getuserdata controller", response);
      if (!response) {
        throw new Error("User not found");
      }

      res
        .status(httpStatusCode.OK)
        .json({ success: true, data: response, message: "User exist" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };
};
