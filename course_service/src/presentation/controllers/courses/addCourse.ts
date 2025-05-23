import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { PricingType } from "../../../domain/entities/courseEntity";
import createCourseProduce from "../../../infrastructure/kafka/producer/createCourseProduce";
import { messages } from "../../../_lib/common/messages";

export const addCourseController = (dependencies: IDependencies) => {
  const {
    useCases: { addCourseUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      req.body.categoryRef = req.body.category;
      req.body.instructorRef = req.body.InstructorRef;
      
      // Ensure pricing exists before setting properties
      if (!req.body.pricing) {
        req.body.pricing = {}; // Initialize pricing if it doesn't exist
      }
      
      req.body.pricing.type = req.body.pricingType;
      req.body.pricing.amount = req.body.price;
      
      delete req.body.category;
      delete req.body.InstructorRef;
      delete req.body.pricingType
      delete req.body.price;
      
      


      const response = await addCourseUseCase(dependencies).execute(req.body);
      if(!response){
        res.status(httpStatusCode.CONFLICT).json({
            success: false,
            data: response,
            message: messages.COURSE_FAILED,
          })
          return
      }

      

      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: messages.COURSE_CREATED,
      });
      return
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error(messages.UNKNOWN_ERROR);
    }
  };
};
