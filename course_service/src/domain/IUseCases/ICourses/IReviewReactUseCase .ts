export interface IReviewReactUseCase {
    execute(id:string,type:string,studentId:string):Promise<boolean>
}