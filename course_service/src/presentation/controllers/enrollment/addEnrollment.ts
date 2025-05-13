import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"
import { httpStatusCode } from "../../../_lib/common/httpStatusCode"

export const addEnrollmentController=(dependencies:IDependencies)=>{
    const {useCases:{addEnrollmentUseCase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {
            const {courseId,studentId}=req.body  
            const response=await addEnrollmentUseCase(dependencies).execute(req.body)
            if(response){
                res.status(httpStatusCode.OK).json({
                    success:true,
                    data:{},
                    message:"You have successfull enrolled to the free course"
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