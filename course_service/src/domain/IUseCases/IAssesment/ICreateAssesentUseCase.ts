import { AssessmentEntity } from "../../entities/assesmentEntity";


export interface ICreateAssessmentUseCase {
  execute(data: AssessmentEntity): Promise<AssessmentEntity | null>;
}
