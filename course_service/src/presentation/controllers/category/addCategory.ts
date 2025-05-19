import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";


export const addCategoryController=(dependencies:IDependencies)=>{
    const {useCases:{addCategoryUseCase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {            
            const response=await addCategoryUseCase(dependencies).execute(req.body)
            console.log(response,"response from addcategory controller")
            res.status(httpStatusCode.OK).json({
              success: true,
              data: response,
              message: messages.CATEGORY_CREATED,
            });
            
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error(messages.UNKNOWN_ERROR);
          }
    }
}