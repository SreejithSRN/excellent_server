import { IDependencies } from "../../application/interfaces/IDependencies";
import { createCheckOutSessionController } from "./createCheckOutSessionController";
import { getPaymentController } from "./getPaymentController";
import { getSummaryController } from "./getSummary";
import { instructorStatsSummaryController } from "./instructorStatsSummary";
import { stripeWebhookHandler } from "./webHookHandler";

export const controllers=(dependencies:IDependencies)=>{
    return {
        createCheckOutSession: createCheckOutSessionController(dependencies),
        stripeWebhook: stripeWebhookHandler(dependencies),
        getPayment:getPaymentController(dependencies),
        getSummary:getSummaryController(dependencies),
        instructorStatsSummary:instructorStatsSummaryController(dependencies)
    }
    
        
    }
