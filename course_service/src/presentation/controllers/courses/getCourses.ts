import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { CourseFilterEntity } from "../../../domain/entities/courseEntity";


export const getCoursesController=(dependencies:IDependencies)=>{
    const {useCases:{getCoursesUseCase}}=dependencies
    const isValidNumber = (value: any) => !isNaN(parseInt(value, 10));
    return async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {  
            
          
          
            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
            if (!isValidNumber(page)) {
                res.status(400).json({
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
         
            const {search,category,pricing,level,sort,minPrice,maxPrice } = req.query.filters as CourseFilterEntity
        
            const filters:CourseFilterEntity = req.query.filters ? {
                search: search,
                category: category,
                pricing: pricing ,
                level: level ,
                sort: sort ,
                minPrice: minPrice ? Number(minPrice) : undefined,
                maxPrice: maxPrice ? Number(maxPrice) : undefined,
              } : {};

         
             


            const result = await getCoursesUseCase(dependencies).execute(page, limit,filters);         
            if (!result) {
                res.status(httpStatusCode.NOT_FOUND).json({ success: false, message: "No courses found" });
                return;
              }
            // console.log(`Fetched result for page ${page} and limit ${limit}:`, result);

            const { data, totalCount } = result;
            res.status(httpStatusCode.OK).json({
                success: true,
                data,totalCount,
                message: "All courses fetched successfully",
            });

            
        } catch (error: unknown) {
            if (error instanceof Error && error.message) {
                next(new Error(error.message)); // Passes the error to Express error handler
              } else {
                next(new Error("An unknown error occurred"));
              }    
          }
    }
}