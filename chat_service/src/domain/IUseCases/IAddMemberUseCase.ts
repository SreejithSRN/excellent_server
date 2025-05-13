export interface IAddMemberUseCase {
    execute(studentId:string,courseId:string): Promise<boolean| null>;
  }