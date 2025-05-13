import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";


export const createAssesmentController = (dependencies: IDependencies) => {
  const { useCases: { createAssessmentUseCase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction):Promise<void> => {
    try {
      const { courseId, questions } = req.body;

      console.log(req.body, "Received in createAssessment controller");

      if (!courseId || !questions || !Array.isArray(questions) || questions.length === 0) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Course ID and questions are required.",
        });
        return
      }

      const questionTexts = questions.map((q: any) =>
        q.questionText.trim().toLowerCase()
      );
      const hasDuplicate = new Set(questionTexts).size !== questionTexts.length;
      
      if (hasDuplicate) {
        res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Duplicate questions are not allowed.",
        });
        return;
      }

      // Rename courseId to courseRef to match what the use case expects
      const payload = {
        courseRef: courseId,
        questions,
      };

      const response = await createAssessmentUseCase(dependencies).execute(payload);

      res.status(httpStatusCode.CREATED).json({
        success: true,
        data: response,
        message: "Assessment created successfully!",
      });
      return

    } catch (error: unknown) {
      if (error instanceof Error) {
       res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: error.message,
        });
        return 
      }

      res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "An unknown error occurred in createAssessment.",
      });
      return 
    }
  };
};
