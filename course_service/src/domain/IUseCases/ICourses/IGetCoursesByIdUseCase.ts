import { CourseEntity } from "../../entities/courseEntity";

export interface  IGetCoursesByIdUseCase{
    execute(data:string):Promise<CourseEntity>
}