import { CourseEntity, CourseFilterEntity } from "../../entities/courseEntity";

export interface IGetCoursesForInstructorUseCase{
   execute(
         page?: number,
         limit?: number,
         id?:string,
         filters?:CourseFilterEntity
       ): Promise<{ data: CourseEntity[]; totalCount: number } | null>;
}