import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const assessmentDeleteController = (dependencies: IDependencies) => {
  const {
    useCases: { deleteAssessmentUseCase},
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id: assessmentId } = req.params;

      console.log("Deleting assessment with ID:", assessmentId);

      if (!assessmentId || typeof assessmentId !== "string") {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Assessment ID is required.",
        });
        return;
      }

      const result = await deleteAssessmentUseCase(dependencies).execute(assessmentId);

      if (!result) {
        res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Assessment not found or could not be deleted.",
        });
        return;
      }

      res.status(httpStatusCode.OK).json({
        success: true,
        message: "Assessment deleted successfully.",
      });
      return;
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
        message: "An unknown error occurred in assessmentDeleteController.",
      });
      return;
    }
  };
};
