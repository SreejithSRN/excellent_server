import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { messages } from "../../../_lib/common/messages";

export const getAdminDashboardSummaryController = (
  dependencies: IDependencies
) => {
  const {
    useCases: { getAdminDashboardSummaryUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await getAdminDashboardSummaryUseCase(
        dependencies
      ).execute();

      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.FETCH_DASHBOARD,
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
