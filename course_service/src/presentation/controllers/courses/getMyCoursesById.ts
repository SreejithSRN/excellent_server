import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
// import { CourseEntity } from "../../../domain/entities/courseEntity";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

export const getMyCoursesByIdController=(dependencies:IDependencies)=>{
    const {useCases:{getMyCoursesByIdUseCase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try {
          const { id} = req.params 
            
            const response= await getMyCoursesByIdUseCase(dependencies).execute(id)
                  res.status(httpStatusCode.OK).json({
                    success: true,
                    data: response,
                    message: messages.FETCH_COURSE_SINGLE,
                  });
                  return
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error(messages.UNKNOWN_ERROR);
          }

    }
}