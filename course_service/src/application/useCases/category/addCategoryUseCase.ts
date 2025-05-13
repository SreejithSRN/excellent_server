import { constant } from "../../../_lib/common/constant";
import { CategoryEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDependencies";

export const addCategoryUseCase=(dependencies:IDependencies)=>{
    const {repositories:{addCategory}}=dependencies
    return {
        execute:async(data:CategoryEntity)=>{
            try {
                console.log(data,"iam from addcategoryusecase .......")
                const result=await addCategory(data)
                return result
                
                
            } catch (error: unknown) {
                if (error instanceof Error) {
                  throw new Error(error.message);
                }
                throw new Error("An unknown error occurred");
              }
        }
    }
}