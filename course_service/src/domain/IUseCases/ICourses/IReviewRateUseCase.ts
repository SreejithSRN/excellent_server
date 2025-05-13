import { ReviewRate, ReviewRateResponse } from "../../entities/reviewEntity";

export interface IReviewRateUseCase{
    execute(data:ReviewRate):Promise<ReviewRateResponse>
}