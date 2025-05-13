import { AssessmentEntity } from "../../entities/assesmentEntity";


export interface IGetInstructorAssessmentsUseCase {
  execute(id:string): Promise<AssessmentEntity | null>;
}
