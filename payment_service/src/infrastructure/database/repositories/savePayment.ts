import { PaymentEntity } from "../../../domain/entities/paymentEntity";
import { Payment } from "../models/paymentModel";

export const savePayment = async(data:PaymentEntity): Promise< PaymentEntity | null> => {
    try{        
        const payment = await Payment.create(data);
        return payment;
    }catch(error){
        throw new Error((error as Error)?.message)
    }
}