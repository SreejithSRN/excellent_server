import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

export const getPaymentController = (dependencies: IDependencies) => {
  const {
    useCases: { getPaymentUseCase },
  } = dependencies;
  const isValidNumber = (value: any) => !isNaN(parseInt(value, 10));

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log(req.query,"incoming payment  query")

      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const search = (req.query.search as string) || "";
      
      if (!isValidNumber(page)) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            success: false,
            message: messages.PAGE_INVALID,
        });
        return;
    }

    if (!isValidNumber(limit)) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            success: false,
            message: messages.LIMIT_INVALID,
        });
        return;
    }
      const studentId = req.user?._id;
      const role = req.user?.role
      if (!studentId&&!role) {
        throw new Error(messages.ID_MISSING);
      }
      const data = {studentId: studentId as string,role:role as string,page,
        limit, search}

      const result = await getPaymentUseCase(dependencies).execute(data);
   
      if(!result){
        res.status(httpStatusCode.NOT_ACCEPTABLE).json({
            success: false,
            message: messages.FETCH_PAYMENT_FAILED
        })
    }

 res.status(httpStatusCode.OK).json({
        success: true,
        data: result,
        message: messages.FETCH_PAYMENT_SUCCESS
    })

      // console.log(result, "iam in the sflbsfbjkbdfjbkf");

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.UNKNOWN_ERROR);
    }
  };
};
