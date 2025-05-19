import { NextFunction, Request, Response } from "express";
import { env_variables } from "../../_boot/config";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common/httpStatusCode";
import { messages } from "../../_lib/common/messages";

const stripe = require('stripe')(env_variables.STRIPE_SECRET_KEY)


export const createCheckOutSessionController=(dependencies:IDependencies)=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        try {            
            const { courseId,userId,amount,thumbnail,courseName,instructorRef } = req.body;
            
            const line_items = [{
                price_data: {
                    currency:'INR',
                    product_data: {
                        name: courseName,
                        images: [thumbnail],
                    },
                    unit_amount: Math.floor( amount*100 )
                },
                quantity:1 
            }]

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${env_variables.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&amount=${amount}&currency=INR&courseId=${courseId}&userId=${userId}`,
                cancel_url: `${env_variables.FRONTEND_URL}/payment/failure`,
                metadata: {
                    courseId,
                    userId,
                    instructorRef                    
                }
               })              
               res.status(httpStatusCode.OK).json({success:true,data:{id:session.id},message:messages.GEN_MESSAGE}) 
                
        } catch (error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            }
            throw new Error(messages.UNKNOWN_ERROR);
          }
    }
}