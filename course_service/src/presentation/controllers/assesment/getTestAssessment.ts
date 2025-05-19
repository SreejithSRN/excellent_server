import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

export const getTestAssessmentController = (dependencies: IDependencies) => {
  const {
    useCases: { getTestAssessmentUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id: courseId } = req.params;

      if (!courseId || typeof courseId !== "string") {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: messages.ID_COURSE_REQUIRED,
        });
        return;
      }

      const response = await getTestAssessmentUseCase(dependencies).execute(
        courseId
      );

      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.FETCH_ASSESSMENT,
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
        message: messages.UNKNOWN_ERROR,
      });
    }
  };
};
