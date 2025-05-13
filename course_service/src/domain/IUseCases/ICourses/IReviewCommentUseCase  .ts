export interface IReviewCommentUseCase {
    execute(id:string,commentText:string,studentId:string):Promise<boolean>
}