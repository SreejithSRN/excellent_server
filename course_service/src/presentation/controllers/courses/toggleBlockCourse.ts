import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const toggleBlockCourseController=(dependencies:IDependencies)=>{
    const {useCases:{toggleBlockCourseUseCase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {
            const {id}=req.body           
            const response=await toggleBlockCourseUseCase(dependencies).execute(id)
            if(response){
                res.status(httpStatusCode.OK).json({
                    success:true,
                    data:{},
                    message:"Blocking/Unblocking of course is successful"
                })
            }            
        }catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
          }
    }
}