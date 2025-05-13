import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";


export const addCategoryController=(dependencies:IDependencies)=>{
    const {useCases:{addCategoryUseCase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {

            console.log(req.body,"iam here in addcategory controller")
            const response=await addCategoryUseCase(dependencies).execute(req.body)
            console.log(response,"response from addcategory controller")
            res.status(httpStatusCode.OK).json({
              success: true,
              data: response,
              message: "Category created succesfully!",
            });
            
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error("An unknown error occurred in add Category");
          }
    }
}