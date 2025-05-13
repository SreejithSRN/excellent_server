import { IDependencies } from "../../interfaces/IDependencies";

// interface GetStudentAssessmentsInput {
//   studentId: string;
// }

export const studentAssessmentsListUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getStudentAssessments },
  } = dependencies;

  return {
    execute: async (studentId:string,search:string) => {
      try {
        if (!studentId) {
          throw new Error("Student ID is required.");
        }

        const assessments = await getStudentAssessments(studentId,search);

        return assessments;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while fetching assessments.");
      }
    },
  };
};
