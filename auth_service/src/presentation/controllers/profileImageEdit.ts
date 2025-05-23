import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

export const profileImageEditController=(dependencies:IDependencies)=>{
    const {useCases:{profileImageEditUseCase}}=dependencies

    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const {image,email}=req.body
            // console.log(image,email,"iam in the controller of profile image edit")

            const result=await profileImageEditUseCase(dependencies).execute(image,email)
            if (result) {
                res.status(httpStatusCode.OK).json({
                  success: true,
                  data: result,
                  message: messages.Profile_Image_Update,
                });
              }
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error(messages.Unknown_Error);
          }
    }
}