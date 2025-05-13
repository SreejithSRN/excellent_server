import { EnrollmentEntity } from "../../entities";

export  interface IAddEnrollmentUseCase{
    execute(data:EnrollmentEntity):Promise<boolean>
}