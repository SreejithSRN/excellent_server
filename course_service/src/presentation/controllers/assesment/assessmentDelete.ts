import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

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
          message: messages.ID_REQUIRED,
        });
        return;
      }

      const result = await deleteAssessmentUseCase(dependencies).execute(assessmentId);

      if (!result) {
        res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: messages.NOT_FOUND_ASSESSMENT,
        });
        return;
      }

      res.status(httpStatusCode.OK).json({
        success: true,
        message: messages.DELETED_ASSESMENT,
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
        message: messages.UNKNOWN_ERROR,
      });
      return;
    }
  };
};
