import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

export const blockUnblockCatController=(dependencies:IDependencies)=>{
    const {useCases:{blockUnblockCatUseCase}}=dependencies

    return async (req:Request,res:Response,next:NextFunction)=>{
        try {            
            const{id}=req.body
            const result=await blockUnblockCatUseCase(dependencies).execute(id)
            res.status(httpStatusCode.OK).json({
                success: true,
                data: {},
                message: messages.BLOCK_UNBLOCK_CAT,
              });
        }catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error(messages.UNKNOWN_ERROR);
          }
    }
}