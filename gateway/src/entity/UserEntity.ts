import { Types } from "mongoose";

export enum Role {
  student = "student",
  instructor = "instructor",
  admin = "admin",
}




export interface UserEntity {
  _id?: Types.ObjectId; 
  email: string; 
  role: Role; 
}