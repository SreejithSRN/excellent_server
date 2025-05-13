import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const getInstructorsUseCase=(dependencies:IDependencies)=>{
    const {repositories}=dependencies
    const {getInstructors}=repositories

    return {
        execute: async (page?: number, limit?: number,search?:string): Promise<{ data: UserEntity[]; totalCount: number } | null> => {
            return await getInstructors(page,limit,search)
        }
    }
}