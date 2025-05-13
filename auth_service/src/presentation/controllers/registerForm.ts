import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

export const registerFormController=(dependencies:IDependencies)=>{
    const {useCases}=dependencies
    const {registerFormUseCase}=useCases

    return async(req:Request,res:Response,next:NextFunction)=>{
        try {
            const data=req.body
            console.log(data,"iam from registerForm Controller...............")
            // console.log(req.body,"iam from registerForm Controller")
            const result=await  registerFormUseCase(dependencies).execute(data)
            // if (result){
            //   res.status(httpStatusCode.OK).json({
            //           success: true,
            //           data: {},
            //           message: "Form registration successful",
            //         });
            // }

            if (result) {
              // ✅ Clear tokens after successful registration
              res.clearCookie("access_token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              });
              res.clearCookie("refresh_token", {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              });
      
             res.status(httpStatusCode.OK).json({
                success: true,
                data: {},
                message: "Form registration successful",
              });
              return
            }
            
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
          }
    }
}