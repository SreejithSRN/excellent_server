import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const blockUnblockUseCase=(dependencies:IDependencies)=>{
    const {repositories}=dependencies
    const {blockUnblock}=repositories
    return {
        execute:async(email:string)=>{
            try {
                return await blockUnblock(email)                
            } catch (error: constant) {
                    throw new Error(error?.message || "Error in blockUnblock usecases");
                  }
        }
    }
}