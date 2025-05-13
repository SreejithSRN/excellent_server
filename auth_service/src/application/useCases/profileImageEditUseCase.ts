import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const profileImageEditUseCase=(dependencies:IDependencies)=>{
    const {repositories:{profileImageEdit}}= dependencies
    return {
        execute:async(image:string,email:string)=>{
            try {
                const result= await profileImageEdit(image,email)
                return result
                
            } catch (error: constant) {
                throw new Error(error?.message || "Error in checking with name");
              }
        }
    }
}