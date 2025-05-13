import { CourseEntity } from "../../entities/courseEntity";

export interface  IGetMyCoursesByIdUseCase{
    execute(data:string):Promise<CourseEntity>
}