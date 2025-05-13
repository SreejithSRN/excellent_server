import { EnrollmentEntity } from "../../../../domain/entities"
import { Enrollment } from "../../models";


export const enrollmentCreated=async(data:EnrollmentEntity)=>{

    try {

        console.log(data,"iam in the course repo to save the enrollment  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
        const enrollment = await Enrollment.create(data);
        
        return true;
    }catch(error){
        throw new Error((error as Error)?.message);
    }
    

}