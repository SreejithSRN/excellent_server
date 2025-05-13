import { PaymentSummaryData } from "../entities";

export interface IGetInstructorSummaryUseCase{
    execute(id:string):Promise<PaymentSummaryData | null>
}