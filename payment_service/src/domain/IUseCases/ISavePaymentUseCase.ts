import { PaymentEntity } from "../entities/paymentEntity";

export interface ISavePaymentUseCase {
    execute:(data:PaymentEntity) =>  Promise<PaymentEntity | null>
}