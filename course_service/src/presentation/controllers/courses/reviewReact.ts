import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

export const reviewReactController = (dependencies: IDependencies) => {
  const {
    useCases: { reviewReactUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const type = req.body.type;
      const studentId = req.user?._id;
      
      if (!studentId) {
        res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: messages.UNAUTHORIZED,
        });
        return;
      }

      const response = await reviewReactUseCase(dependencies).execute(
        id,
        type,
        studentId
      );
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.REACTION_ADDED,
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.UNKNOWN_ERROR);
    }
  };
};
