import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const instructorStatsSummaryController = (dependencies: IDependencies) => {
  const {
    useCases: {getInstructorSummaryUseCase},
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const id = req.user?._id;
if (!id) {
  res.status(httpStatusCode.UNAUTHORIZED).json({
    success: false,
    message: "Unauthorized: Instructor ID is missing.",
  });
  return
}

      const response = await getInstructorSummaryUseCase (dependencies).execute(id);
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: "Fetched instructor dashboard data's succesfully! from payment",
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(
        "An unknown error occurred in instructorStatsSummaryController in payment"
      );
    }
  };
};
