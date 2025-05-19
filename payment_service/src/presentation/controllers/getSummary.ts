import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

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
