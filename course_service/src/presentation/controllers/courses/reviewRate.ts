import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

export const reviewRateController = (dependencies: IDependencies) => {
  const { useCases: { reviewRateUseCase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body.userRef = req.user?._id;

      const response = await reviewRateUseCase(dependencies).execute(req.body);

      if (!response.success) {
        // Review already exists or failed
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: response.message || messages.REVIEW_FAILED,
        });
        return;
      }

      // Review created successfully
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response.review,
        message: response.message || messages.REVIEW_ADDED,
      });

    } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error(messages.UNKNOWN_ERROR);
        }
  };
};
