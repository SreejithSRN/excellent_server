import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const getPaymentController = (dependencies: IDependencies) => {
  const {
    useCases: { getPaymentUseCase },
  } = dependencies;
  const isValidNumber = (value: any) => !isNaN(parseInt(value, 10));

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.query,"incoming payment  query")

      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const search = (req.query.search as string) || "";
      
      if (!isValidNumber(page)) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            success: false,
            message: "Invalid page number",
        });
        return;
    }

    if (!isValidNumber(limit)) {
        res.status(httpStatusCode.BAD_REQUEST).json({
            success: false,
            message: "Invalid limit number",
        });
        return;
    }
      const studentId = req.user?._id;
      const role = req.user?.role
      if (!studentId&&!role) {
        throw new Error("Student ID is missing");
      }
      const data = {studentId: studentId as string,role:role as string,page,
        limit, search}

      const result = await getPaymentUseCase(dependencies).execute(data);

     

   
      if(!result){
        res.status(httpStatusCode.NOT_ACCEPTABLE).json({
            success: false,
            message: "All Payments fetch failed"
        })
    }

 res.status(httpStatusCode.OK).json({
        success: true,
        data: result,
        message: "all Payments fetched"
    })

      console.log(result, "iam in the sflbsfbjkbdfjbkf");

    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred in add Category");
    }
  };
};
