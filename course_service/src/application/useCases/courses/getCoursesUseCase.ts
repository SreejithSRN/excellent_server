import { constant } from "../../../_lib/common/constant";
import { CourseEntity, CourseFilterEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getCoursesUseCase=(dependencies:IDependencies)=>{
    const {repositories:{getCourses}}=dependencies
    return {
        execute: async (
          page?: number,
          limit?: number,
          filters?:CourseFilterEntity
        ): Promise<{ data: CourseEntity[]; totalCount: number } | null> => {
          try {           
            let result = await getCourses(page, limit,filters);
            return result
          } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error("An unknown error occurred");
          }
        },
      };

}