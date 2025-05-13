import { StudentStats } from "../../entities/courseDashboardDataEntity";

export interface IGetStudentDashboardSummaryUseCase{
    execute(id:string):Promise< StudentStats| null>
}