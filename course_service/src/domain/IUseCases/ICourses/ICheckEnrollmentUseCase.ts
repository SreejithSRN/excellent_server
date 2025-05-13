export interface ICheckEmrollmentUseCase{
    execute(studentId:string,courseId:string):Promise<boolean|string>
}