import { constant } from "../../../_lib/common/constant";
import { CourseEntity, CourseFilterEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getStudentMyCoursesUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getStudentMyCourses}}=dependencies
    return{
        execute: async (
            page?: number,
            limit?: number,
            id?:string,
            filters?:CourseFilterEntity
          ):Promise<{ data: CourseEntity[]; totalCount: number } | null>=>{
            try {
                let result = await getStudentMyCourses(page, limit,id,filters);
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