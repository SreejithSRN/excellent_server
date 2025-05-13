import { CourseEntity, UserEntity } from "../../domain/entities"
import { courseCreatedConsumer, userCreatedConsumer } from "./consumers"


export interface ISubscriber{
    userCreated:(data:UserEntity)=>Promise<void>
	courseCreated:(data:CourseEntity)=>Promise<void>
}

export interface IPaymentSubscriber
	extends Pick<
		ISubscriber,
		| "userCreated"	
		| "courseCreated"	
	> {}

export const createSubscriber=():IPaymentSubscriber=>{
    return {
        userCreated:userCreatedConsumer,
		courseCreated:courseCreatedConsumer
}
}