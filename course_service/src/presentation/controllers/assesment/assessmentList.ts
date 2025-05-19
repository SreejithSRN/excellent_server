import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

export const assessmentListController = (dependencies: IDependencies) => {
  const {
    useCases: {getInstructorAssessmentsUseCase },
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id:instructorId } = req.params;

      console.log("iam here in controller assesmentlist",instructorId)

      if (!instructorId || typeof instructorId !== "string") {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: messages.ID_INSTRUCTOR_REQUIRED,
        });
        return;
      }

      const response = await getInstructorAssessmentsUseCase(dependencies).execute(instructorId);

      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.FETCH_ASSESSMENT,
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
