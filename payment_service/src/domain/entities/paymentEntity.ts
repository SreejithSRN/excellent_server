import { Date, Schema } from "mongoose";

export interface PaymentEntity {
  _id?: Schema.Types.ObjectId;
  studentId?: Schema.Types.ObjectId;
  courseId?: Schema.Types.ObjectId;
  instructorId?:Schema.Types.ObjectId;
  sessionId?:string
  customerEmail?:string;
  customerName?:string
  method: string;
  status: "pending" | "completed" | "failed";
  amount: number;
  currency?:string;
  instructorEarning?:number
  adminEarning?:number
  receipt?:string;
  createdAt?:Date;
  updatedAt?:Date;
}
export interface paymentDetailsProps{
  _id?:string,
  courseTitle?:string,
  amount?:number,
  dateOfPurchase?:Date,
  receipt?:string,
  studentName?:string,
  instructorName?:string

 }
