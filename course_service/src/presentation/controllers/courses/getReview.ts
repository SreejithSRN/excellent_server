import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies"
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const getReviewController=(dependencies:IDependencies)=>{
    const {useCases:{getReviewUseCase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try {
          const { id} = req.params 
          
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
          console.log(">>>>>>>>>>>>>>>>>>>  iam here in  getreview>>>>>>>>>>>>>>>>>>>>>>>>", id)
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            
            const response= await getReviewUseCase(dependencies).execute(id)
                  res.status(httpStatusCode.OK).json({
                    success: true,
                    data: response,
                    message: "Reviews fetched succesfully!",
                  });
                  return
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
          }

    }
}