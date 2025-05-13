
import { PaymentSummaryData } from '../../../domain/entities';
import { Payment } from '../models/paymentModel';

export const getInstructorSummary = async (instructorId: string): Promise<PaymentSummaryData | null> => {
  try {
    // Fetch all payments for this instructor
    const payments = await Payment.find({
      instructorId,
      status: 'completed', // only count completed payments
    });

    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const totalPurchases = payments.length;

    return {
      totalRevenue,
      totalPurchases,
    };
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred while generating payment summary");
  }
};
