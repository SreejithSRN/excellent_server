import { Types } from "mongoose";
import { Course } from "../../models";

export const streamVideo=async(courseId:string)=>{
    try {
        const objectId = new Types.ObjectId(courseId)
        const result = Course.findById(objectId)
        return result;        
    } catch (error:unknown) {
        if(error instanceof Error) throw new Error(error.message);
        else throw new Error("An unknown error");
    }
}