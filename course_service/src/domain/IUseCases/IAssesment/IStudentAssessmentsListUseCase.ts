import { AssessmentView } from "../../entities/assesmentEntity";




  
export interface IStudentAssessmentsListUseCase {
  execute(id: string,search:string): Promise<AssessmentView[]>;
}
