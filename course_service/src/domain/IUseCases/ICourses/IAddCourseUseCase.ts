import { CourseEntity } from "../../entities/courseEntity";

export interface IAddCourseUseCase{
    execute(data:CourseEntity):Promise<boolean>
}