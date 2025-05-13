import { IDependencies } from "../../interfaces/IDependencies";

export const streamVideoUseCase=(dependencies:IDependencies)=>{
    const {repositories:{streamVideo}}=dependencies
    return {
        execute:async(courseId:string)=>{
            try {
                
                return await streamVideo(courseId)                
            } catch (error: unknown) {
                if (error instanceof Error) {
                  throw new Error(error.message);
                }
                throw new Error("An unknown error occurred");
              }
        }
    }
}