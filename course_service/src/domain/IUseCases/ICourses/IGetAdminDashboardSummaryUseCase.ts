import { CourseDashboardData } from "../../entities/courseDashboardDataEntity";


export interface IGetAdminDashboardSummaryUseCase{
    execute():Promise<CourseDashboardData | null>
}