
import { PaymentSummaryData } from '../../../domain/entities';
import { Payment } from '../models/paymentModel';

export const getSummary = async (): Promise<PaymentSummaryData | null> => {
  try {
    const payments = await Payment.find({ status: 'completed' });

    let totalRevenue = 0;
    let totalProfit = 0;

    for (const payment of payments) {
      totalRevenue += payment.amount; 
      totalProfit += payment.adminEarning??0; 
    }

    return {
      totalRevenue,
      totalProfit,
    };
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred while generating dashboard summary");
  }
};
