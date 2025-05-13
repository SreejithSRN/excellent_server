import { PaymentSummaryData } from "../../domain/entities";
import { paymentDetailsProps } from "../../domain/entities/paymentEntity";

export interface IRepositories {
  getPayments: (data: {
    studentId: string;
    role: string;
    page?: number;
    limit?: number;
    search?:string
  }) => Promise<{
    payments: paymentDetailsProps[];
    totalCount: number;
    totalAmount: number;
    totalCourses: number
  }>;

  getSummary :()=>Promise<PaymentSummaryData | null>
  getInstructorSummary :(id:string)=>Promise<PaymentSummaryData | null>
}
