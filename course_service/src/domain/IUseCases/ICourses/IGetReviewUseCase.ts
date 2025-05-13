import { ReviewEntity } from "../../entities/reviewEntity";

export interface IGetReviewUseCase{
    execute(id:string):Promise<ReviewEntity[]>
}