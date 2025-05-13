import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

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
          message: response.message || "Failed to submit review.",
        });
        return;
      }

      // Review created successfully
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response.review,
        message: response.message || "Review added successfully!",
      });

    } catch (error: unknown) {
      next(error); // Pass error to global error handler
    }
  };
};
