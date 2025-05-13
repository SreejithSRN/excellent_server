import { AssessmentEntity } from "../../entities/assesmentEntity";


export interface IDeleteAssessmentUseCase {
  execute(id:string): Promise<boolean| null>;
}