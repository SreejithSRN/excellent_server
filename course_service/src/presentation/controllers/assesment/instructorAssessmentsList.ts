

import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const instructorAssessmentsListController = (dependencies: IDependencies) => {
  const {
    useCases: { instructorAssessmentsListUseCase},
  } = dependencies;

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const instructorId = req.user?._id as string; 
      const searchTerm = req.query.search as string || "";
      
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(">>>>>>>>>>>>>>>>>>>>>",instructorId,searchTerm)
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    

      if (!instructorId) {
        res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Unauthorized access. Student ID not found.",
        });
        return;
      }

      const assessments = await instructorAssessmentsListUseCase(dependencies).execute( instructorId, searchTerm );

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
          message: "An unknown error occurred in instructorAssessmentsListController.",
        });
      }
    }
  };
};
