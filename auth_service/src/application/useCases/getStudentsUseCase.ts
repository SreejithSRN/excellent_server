import { constant } from "../../_lib/common/constant";
import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const getStudentsUseCase=(dependencies:IDependencies)=>{
    const {repositories}=dependencies
    const {getStudents}=repositories

    return {
        execute:async (page?: number, limit?: number,search?:string): Promise<{ data: UserEntity[]; totalCount: number } | null>=>{
            try {
                return await getStudents(page,limit,search)
                
            } catch (error: constant) {
                throw new Error(error?.message || "Error in approveReject usecases");
              }
             
             
        }
    }
}