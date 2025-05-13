import { PaymentEntity } from "../../domain/entities/paymentEntity";
import { savePayment } from "../../infrastructure/database/repositories";
import { IDependencies } from "../interfaces/IDependencies";

export const savePaymentUseCase = (dependencies:IDependencies) => {
    const { repositories:{  }} = dependencies;
    return {
        execute:async(data:PaymentEntity) => {
            try{    
                return await savePayment(data);
            }catch(error){
                throw new Error((error as Error)?.message);
            }
        }
    }
}