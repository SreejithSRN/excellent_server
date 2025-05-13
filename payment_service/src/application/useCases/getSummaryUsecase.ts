import { PaymentSummaryData } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const getSummaryUseCase = (dependencies: IDependencies) => {
  const {repositories:{getSummary}} = dependencies;
  return {
    execute: async ( ): Promise<PaymentSummaryData| null > => {
      try {  
        let result = await getSummary();
        return result
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
      }
    },
  };
};
