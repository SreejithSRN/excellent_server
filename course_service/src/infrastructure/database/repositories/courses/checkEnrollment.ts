import { Enrollment } from "../../models";

export const checkEnrollment=async(studentId:string,courseId:string):Promise<boolean|string>=>{
    try {

        const existingEnrollment = await Enrollment.findOne({ studentId, courseId });
        return existingEnrollment ? true : false;
    }catch (error: unknown) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("An unexpected error occurred");
      }
}