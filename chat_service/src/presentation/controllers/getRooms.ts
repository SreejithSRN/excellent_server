import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

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
          message: "Unauthorized: ID not found",
        });
        return;
      }
      const response = await getRoomsUseCase(dependencies).execute(id);    
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: "Chats fetched succesfully!",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred in chat fetching");
    }
  };
};
