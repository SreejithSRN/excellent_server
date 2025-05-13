import { AssessmentEntity } from "../../entities/assesmentEntity";


export interface IGetTestAssessmentUseCase  {
  execute(id:string): Promise<AssessmentEntity | null>;
}