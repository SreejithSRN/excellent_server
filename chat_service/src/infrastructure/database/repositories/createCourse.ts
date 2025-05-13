import { CourseEntity } from "../../../domain/entities";
import { Course } from "../models/courseModel";

export const createCourse = async (data: CourseEntity): Promise<CourseEntity | null> => {
    try {
        
        console.log("///////////////////////////////////////////// ");
        console.log(" I am here in the repository to save the Course in chat_service");
        console.log("///////////////////////////////////////////// ");

        console.log(data,"iam in repository for course adding")

       
        const updatedCourse = await Course.findOneAndUpdate(
            { _id : data._id }, 
            { $set: data }, 
            { upsert: true, new: true } 
        );

        console.log("course saved successfully:", updatedCourse);
        return updatedCourse;
      
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in courseCreated repository:", error.message);
            console.error(error.stack);
        } else {
            console.error("Unknown error in courseCreated repository:", error);
        }
        return null;
    }
};