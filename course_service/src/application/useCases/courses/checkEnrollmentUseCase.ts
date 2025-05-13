import { IDependencies } from "../../interfaces/IDependencies";

export const checkEnrollmentUseCase=(dependencies:IDependencies)=>{
    const {repositories:{checkEnrollment}}=dependencies
    return {
        execute:async(studentId:string,courseId:string)=>{
            try {          

                const result=await checkEnrollment(studentId,courseId)
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