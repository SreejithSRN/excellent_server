import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

export const getRoomsController = (dependencies: IDependencies) => {
  const {
    useCases: { getRoomsUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.user?._id;
      if (!id) {
        res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: messages.UNAUTHORIZED,
        });
        return;
      }
      const response = await getRoomsUseCase(dependencies).execute(id);    
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.CHAT_FETCH_SUCCESS,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
