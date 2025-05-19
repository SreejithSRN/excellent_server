import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { messages } from "../../../_lib/common/messages";

export const getStudentDashboardSummaryController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { getStudentDashboardSummaryUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.user?._id;
      if (!id) {
        res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: messages.UNAUTHORIZED,
        });
        return;
      }

      const response = await getStudentDashboardSummaryUseCase(
        dependencies
      ).execute(id);

      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.FETCH_STUDENT_DASHBOARD,
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(
        messages.UNKNOWN_ERROR
      );
    }
  };
};
