import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const submitAssessmentController = (dependencies: IDependencies) => {
  const {
    useCases: {submitAssessmentUseCase},
  } = dependencies;

  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id:courseId } = req.params;
      const { answers } = req.body; 
      
      const studentId=req.user?._id as string
      


      if (!courseId || typeof courseId !== "string") {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Course ID is required.",
        });
        return;
      }

      if (!Array.isArray(answers) || answers.length === 0) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Answers must be a non-empty array.",
        });
        return;
      }


      const result = await submitAssessmentUseCase(dependencies).execute({
        courseId,
        answers,
        studentId
      });     

      res.status(httpStatusCode.OK).json({
        success: true,
        message: "Assessment evaluated successfully.",
        data: result,
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
          message: "An unknown error occurred in submitAssessmentController.",
        });
      }
    }
  };
};
