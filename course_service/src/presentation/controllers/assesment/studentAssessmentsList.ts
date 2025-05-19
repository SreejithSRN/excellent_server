

import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";
export const studentAssessmentsListController = (dependencies: IDependencies) => {
  const {
    useCases: { studentAssessmentsListUseCase },
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const studentId = req.user?._id as string;
      const searchTerm = (req.query.search as string || "").trim().toLowerCase(); // get search term

      if (!studentId) {
        res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: messages.UNAUTHORIZED,
        });
        return;
      }

      // Pass both studentId and searchTerm to use case
      const assessments = await studentAssessmentsListUseCase(dependencies).execute(studentId, searchTerm);

      res.status(httpStatusCode.OK).json({
        success: true,
        data: assessments,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: messages.UNKNOWN_ERROR,
        });
      }
    }
  };
};
