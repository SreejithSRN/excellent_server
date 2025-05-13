import { PaymentSummaryData } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const getInstructorSummaryUseCase = (dependencies: IDependencies) => {
  const {repositories:{getInstructorSummary}} = dependencies;
  return {
    execute: async (id:string ): Promise<PaymentSummaryData| null > => {
      try {  
        let result = await getInstructorSummary(id);
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
