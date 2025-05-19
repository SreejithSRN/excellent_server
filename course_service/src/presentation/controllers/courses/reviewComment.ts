import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

export const reviewCommentController = (dependencies: IDependencies) => {
  const {
    useCases: { reviewCommentUseCase },
  } = dependencies;
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const studentId = req.user?._id;
      const commentText = req.body.commentText;
      if (!studentId) {
        res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: messages.UNAUTHORIZED,
        });
        return;
      }
      const response = await reviewCommentUseCase(dependencies).execute(
        id,
        commentText,
        studentId
        
      );
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.COMMENTS_SUCCESS,
      });
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.UNKNOWN_ERROR);
    }
  };
};
