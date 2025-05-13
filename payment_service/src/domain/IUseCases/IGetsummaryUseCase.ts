import { PaymentSummaryData } from "../entities";

export interface IGetSummaryUseCase{
    execute():Promise<PaymentSummaryData | null>
}