import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import userCreatedProducer from "../../infrastructure/kafka/producer/userCreatedProducer";
import { messages } from "../../_lib/common/messages";

export const profileEditController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const { profileEditUseCase } = useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;      
      const result = await profileEditUseCase(dependencies).execute(data);
      
       await userCreatedProducer(result)
      if (result) {
        res.status(httpStatusCode.OK).json({
          success: true,
          data: null,
          message: messages.Profile_Update,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
