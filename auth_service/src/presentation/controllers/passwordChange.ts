import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { hashPassword } from "../../_lib/utility/bcrypt/hashpassword";

export const passwordChangeController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const { passwordChangeUseCase } = useCases;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.newPassword = await hashPassword(req.body.newPassword);
      req.body.confirmPassword = await hashPassword(req.body.confirmPassword);
      // req.body.currentPassword = await hashPassword(req.body.currentPassword);
      const data = req.body;
      const result = await passwordChangeUseCase(dependencies).execute(data);
      if (typeof result === "string") {
        res
          .status(httpStatusCode.BAD_REQUEST)
          .json({ success: false, message: result });
        return;
      }
      if (result) {
        res.status(httpStatusCode.OK).json({
          success: true,
          data: null,
          message: "Password Updated successfully",
        });
      } else {
        res.status(httpStatusCode.NOT_MODIFIED).json({
          success: false,
          data: null,
          message: "Password updation failed",
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred");
    }
  };
};
