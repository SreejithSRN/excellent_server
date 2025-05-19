import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

export const addChatController = (dependencies: IDependencies) => {
  const {
    useCases: { addChatUseCase},
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {          
      const id = req.user?._id;
      req.body.sender=id
      if (!id) {
        res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: messages.UNAUTHORIZED,
        });
        return;
      }    
      const response = await addChatUseCase(dependencies).execute(req.body);    
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.CHAT_MESSAGE_SUCCESS,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
