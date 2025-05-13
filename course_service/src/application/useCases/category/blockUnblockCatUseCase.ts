import { constant } from "../../../_lib/common/constant";
import { IDependencies } from "../../interfaces/IDependencies";

export const blockUnblockCatUseCase=(dependencies:IDependencies)=>{
    const{repositories:{blockUnblockCat}}=dependencies
    return {
        execute:async(id:string)=>{
            try {
                return await blockUnblockCat(id)
            }  catch (error: unknown) {
                if (error instanceof Error) {
                  throw new Error(error.message);
                }
                throw new Error("An unknown error occurred");
              }
        }
    }
}