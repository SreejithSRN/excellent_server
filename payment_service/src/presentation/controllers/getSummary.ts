import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const getSummaryController = (dependencies: IDependencies) => {
  const {
    useCases: { getSummaryUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await getSummaryUseCase(dependencies).execute();
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: "Fetched admin dashboard data's succesfully! from payment",
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(
        "An unknown error occurred in getSummaryController in payment"
      );
    }
  };
};
