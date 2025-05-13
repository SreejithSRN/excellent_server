

import { paymentDetailsProps } from "../../domain/entities/paymentEntity";
import { IDependencies } from "../interfaces/IDependencies";

export const getPaymentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getPayments },
  } = dependencies;

  return {
    execute: async (data: {
      studentId: string;
      role: string;
      page?: number;
      limit?: number;
      search?:string
    }): Promise<{
      payments: paymentDetailsProps[]; 
      totalCount: number;
      totalAmount:number;
       totalCourses:number
    }> => {
      try {        

        const response = await getPayments(data);

        return {
          payments: response.payments,
          totalCount: response.totalCount,
          totalAmount: response.totalAmount,
          totalCourses: response.totalCourses,
        };
      } catch (error) {
        throw new Error((error as Error)?.message);
      }
    },
  };
};
