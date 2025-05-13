import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const addMemberController = (dependencies: IDependencies) => {
  const {
    useCases: { addMemberUseCase},
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {  
        const {studentId,courseId} =req.body    
        
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(">>>>>>>>>>>>>>>>njan ara ariyooo>>>>>>>>>>>>>>>>>>>>>>>>>",req.body,studentId,courseId)
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      
      const response = await addMemberUseCase(dependencies).execute(studentId,courseId);    
      res.status(httpStatusCode.OK).json({
        success: true,
        data: response,
        message: "Chat member added succesfully!",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("An unknown error occurred in chat member adding");
    }
  };
};
