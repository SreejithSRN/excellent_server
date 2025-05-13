import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import Stripe from "stripe";
import { env_variables } from "../../_boot/config";
import { PaymentEntity } from "../../domain/entities/paymentEntity";
import { savePaymentUseCase } from "../../application/useCases";
import enrollmentProducer from "../../infrastructure/kafka/producer/enrollmentProducer";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";

const stripe = require("stripe")(env_variables.STRIPE_SECRET_KEY);

export const stripeWebhookHandler = (dependencies: IDependencies) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const endpointSecret = env_variables.STRIPE_WEBHOOK_SECRET;
    const sig = req.headers["stripe-signature"] as string;

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        endpointSecret as string
      );
    } catch (error) {
      console.error(
        "  Webhook signature verification failed:",
        (error as Error).message
      );
      res
        .status(httpStatusCode.BAD_REQUEST)
        .json({
          success: false,
          message: "Webhook signature verification failed",
        });
      return;
    }

    // Only process the required events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log(
        "Payment successful for sessiokkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkn:",
        session
      );

      if (session.metadata?.courseId) {
        console.log("Processing course purchase:", session.metadata.courseId);
        await handleCourseCheckoutSession(session, dependencies);
      } else {
        console.log("No course ID found in session metadata");
      }
    } else if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("Payment failed for session:", session.id);
      // You can handle the failure logic here, such as notifying the user
    } else {
      console.log(`Ignoring event: ${event.type}`);
      res.status(httpStatusCode.OK).json({ success: true, message: "Event ignored" });
      return;
    }

    res
      .status(httpStatusCode.OK)
      .json({ success: true, message: "Webhook processed successfully" });
  };
};

const handleCourseCheckoutSession = async (
  session: any,
  dependencies: IDependencies
) => {
  const {
    useCases: {},
  } = dependencies;
  const courseId = session.metadata.courseId;
  const studentId = session.metadata.userId;
  const instructorId = session.metadata.instructorRef;
  const amount = session.amount_total / 100;
  const method = session.payment_method_types[0];
  const status = session.payment_status === "paid" ? "completed" : "failed";
  const sessionId = session.id;
  const customerEmail = session.customer_details.email;
  const customerName = session.customer_details.name;
  const currency = session.currency;
  const instructorEarning = amount * 0.6;
  const adminEarning = amount * 0.4;
  let receipt = "";

  try {
    const charges = await stripe.charges.list({ payment_intent: session.payment_intent });
if (charges.data.length > 0) {
  receipt = charges.data[0].receipt_url || "";
}

    // if (session.payment_intent) {
    //   const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
      
    //   if (paymentIntent.charges?.data.length > 0) {
    //     const charge = paymentIntent.charges.data[0]; // Get the first charge
    //     receipt = charge.receipt_url || "";
    //   }
    // }
    const data: PaymentEntity = {
      courseId,
      studentId,
      instructorId,
      amount,
      method,
      status,
      sessionId,
      customerEmail,
      customerName,
      currency,instructorEarning,adminEarning,receipt
    };
    // console.log(data, "haiiiiiiiiiiiiiiiiiiiiiii");

    const response = await savePaymentUseCase(dependencies).execute(data);

    console.log(response, " Payment saved to database")

    const enrollmentData = {
      studentId,
      courseId,      
  };
  await enrollmentProducer(enrollmentData)
  console.log("enrollment producer produced successsfully...................")
  } catch (error) {
    console.error("Error processing course payment", error);
    throw new Error((error as Error)?.message);
}
};