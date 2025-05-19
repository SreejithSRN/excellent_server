import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

export const logoutController = (dependencies: IDependencies) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookieOptions: any = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 0,
      };
      res.cookie("access_token", "", cookieOptions);
      res.cookie("refresh_token", "", cookieOptions);
      res.status(httpStatusCode.NO_CONTENT).json({});
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.Unknown_Error);
    }
  };
};
