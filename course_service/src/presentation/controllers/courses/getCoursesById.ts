import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
// import { CourseEntity } from "../../../domain/entities/courseEntity";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";

export const getCoursesByIdController=(dependencies:IDependencies)=>{
    const {useCases:{getCoursesByIdUseCase}}=dependencies
    return async(req:Request,res:Response,next:NextFunction):Promise<void> =>{
        try {
            const { id} = req.params 
            
            const response= await getCoursesByIdUseCase(dependencies).execute(id)

           
            
                  res.status(httpStatusCode.OK).json({
                    success: true,
                    data: response,
                    message: "Course fetched succesfully!",
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