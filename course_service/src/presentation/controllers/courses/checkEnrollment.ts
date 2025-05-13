import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const checkEnrollmentController=(dependencies:IDependencies)=>{
    const{useCases:{checkEnrollmentUseCase}}=dependencies

    return async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {       

            const studentId = req.query.studentId as string | undefined;
      const courseId = req.query.courseId as string | undefined;

      if (!studentId || !courseId) {
        res.status(httpStatusCode.BAD_REQUEST).json({ message: "Missing studentId or courseId" });
        return 
      }

      console.log(studentId, courseId, "Checking enrollment in controller");

           
            let result=await checkEnrollmentUseCase(dependencies).execute(studentId,courseId)
            
            res.status(httpStatusCode.OK).json({success:true,data:result, message: "Missing studentId or courseId" });
            
        }  catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
          }
    }
    }
