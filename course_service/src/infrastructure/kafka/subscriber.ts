import { EnrollmentEntity, UserEntity } from "../../domain/entities"
import { enrollmentCreatedConsumer, userCreatedConsumer } from "./consumer"

// export interface enrollprops{
// 	studentId:string,
// 	courseId:string
// }

export interface ISubscriber{
    userCreated:(data:UserEntity)=>Promise<void>
    enrollmentCreated:(data:EnrollmentEntity)=>Promise<void>
}

export interface ICourseSubscriber
	extends Pick<
		ISubscriber,
		| "userCreated"	
		|"enrollmentCreated"
	> {}

export const createSubscriber=():ICourseSubscriber=>{
    return {
        userCreated:userCreatedConsumer,
		enrollmentCreated:enrollmentCreatedConsumer
}
}