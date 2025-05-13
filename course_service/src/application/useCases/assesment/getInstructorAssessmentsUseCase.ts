import { IDependencies } from "../../interfaces/IDependencies";

export const getInstructorAssessmentsUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getCoursesWithAssessments },
  } = dependencies;

  return {
    execute: async (instructorId: string) => {
      try {
        if (!instructorId) {
          throw new Error("Instructor ID is required");
        }

        const result = await getCoursesWithAssessments(instructorId);
        return result;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while fetching assessments.");
      }
    },
  };
};
