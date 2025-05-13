import { IDependencies } from "../../interfaces/IDependencies";

// interface GetStudentAssessmentsInput {
//   studentId: string;
// }

export const instructorAssessmentsListUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getInstructorAssessments },
  } = dependencies;

  return {
    execute: async (instructorId:string, searchTerm:string) => {
      try {
        if (!instructorId) {
          throw new Error("Student ID is required.");
        }

        const assessments = await getInstructorAssessments(instructorId,searchTerm);

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
