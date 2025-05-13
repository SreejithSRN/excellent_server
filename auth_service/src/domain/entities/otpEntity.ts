import { Types } from "mongoose";

export interface otpEntity {
  _id?: Types.ObjectId;
  email: string;
  otp: string | number;
  createdAt?: Date;
}




