import { Schema, model } from "mongoose";
import { PaymentEntity } from "../../../domain/entities/paymentEntity";

const paymentSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:"User"
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref:"Course"
    },
    instructorId:{
      type: Schema.Types.ObjectId,
      required: true,
      ref:"User"
    },
    sessionId:{
        type:String
    },
    customerEmail:{
        type:String
    },
    customerName:{
        type:String
    },

    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency:{
        type:String
    },
    receipt:{
        type:String
    },
    instructorEarning:{
        type:Number
    },
    adminEarning:{
        type:Number
    },
  },
  { timestamps: true }
);

export const Payment = model<PaymentEntity>("Payment", paymentSchema);
