import { InstructorCourseStats } from "../../entities/courseDashboardDataEntity";



export interface IGetInstructorDashboardSummaryUseCase{
    execute(id:string):Promise< InstructorCourseStats| null>
}