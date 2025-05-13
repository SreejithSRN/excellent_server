import { AssessmentEntity } from "../../entities/assesmentEntity";

export interface SubmitAssessmentInput {
    courseId: string;
    answers: string[];
    studentId:string

  }

export interface SubmitAssessmentResult {
  assessment?: AssessmentEntity;
  score: number;
  mark:number
  isPassed:boolean
}

export interface ISubmitAssessmentUseCase {
  execute(input: SubmitAssessmentInput): Promise<SubmitAssessmentResult>;
}
  
