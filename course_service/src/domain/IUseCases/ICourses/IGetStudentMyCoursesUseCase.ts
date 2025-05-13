import { CourseEntity, CourseFilterEntity } from "../../entities/courseEntity";

export interface IGetStudentMyCoursesUseCase{
   execute(
         page?: number,
         limit?: number,
         id?:string,
         filters?:CourseFilterEntity
       ): Promise<{ data: CourseEntity[]; totalCount: number } | null>;
}