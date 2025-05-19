import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

export const blockUblockController = (dependencies: IDependencies) => {
  const { useCases } = dependencies;
  const { blockUnblockUseCase } = useCases;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const result = await blockUnblockUseCase(dependencies).execute(email);
      console.log(result, "iam in blockunblock controller..........");

      res.status(httpStatusCode.OK).json({
        success: true,
        data: {},
        message: messages.Block_unBlock,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
