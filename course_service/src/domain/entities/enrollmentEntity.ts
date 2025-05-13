import { Types } from "mongoose";

export interface EnrollmentEntity {
    _id?: Types.ObjectId;
   studentId: Types.ObjectId;
    courseId: Types.ObjectId;
    enrolledAt?: Date | string; 
    isTestCompleted?:boolean;
    mark?:number[]   
}