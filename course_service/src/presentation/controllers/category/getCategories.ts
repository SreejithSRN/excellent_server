import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../../_lib/common/httpStatusCode";
import { messages } from "../../../_lib/common/messages";

export const getCategoriesController=(dependencies:IDependencies)=>{
    const {useCases:{getCategoriesUseCase}}=dependencies
    const isValidNumber = (value: any) => !isNaN(parseInt(value, 10));
    return async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
        try {

            console.log(req.query,"incoming category query")
            const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
            const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
            const rawSearch = req.query.search;
            const search = typeof rawSearch === 'string' ? rawSearch : undefined;
            if (!isValidNumber(page)) {
                res.status(400).json({
                    success: false,
                    message: messages.Page_Invalid,
                });
                return;
            }

            if (!isValidNumber(limit)) {
                res.status(httpStatusCode.BAD_REQUEST).json({
                    success: false,
                    message: messages.Limit_Invalid,
                });
                return;
            }
            const result = await getCategoriesUseCase(dependencies).execute(page, limit,search);
            if (!result) {
                res.status(httpStatusCode.NOT_FOUND).json({ success: false, message: messages.NO_CATEGORIES });
                return;
              }
            // console.log(`Fetched result for page ${page} and limit ${limit}:`, result);

            const { data, totalCount } = result;
            res.status(httpStatusCode.OK).json({
                success: true,
                data,totalCount,
                message: messages.FETCH_CATEGORIES,
            });

            
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error(messages.UNKNOWN_ERROR);
          }
    }

}