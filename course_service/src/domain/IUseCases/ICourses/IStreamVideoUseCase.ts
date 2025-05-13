import { CourseEntity } from "../../entities/courseEntity";

export interface IStreamVideoUseCase{
    execute(courseId:string):Promise<CourseEntity|null>
}