import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const getTestAssessmentController = (dependencies: IDependencies) => {
  const {
    useCases: { getTestAssessmentUseCase},
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id:courseId } = req.params;

      console.log("Getting test assessment for course:", courseId);

      if (!courseId || typeof courseId !== "string") {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Course ID is required.",
        });
        return;
      }

      const response = await getTestAssessmentUseCase(dependencies).execute(courseId);

      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: "Assessment fetched successfully!",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message,
        });
        return;
      }

      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "An unknown error occurred in getTestAssessmentController.",
      });
    }
  };
};
