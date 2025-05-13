import { IDependencies } from "../../interfaces/IDependencies";

export const getTestAssessmentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getTestAssessment },
  } = dependencies;

  return {
    execute: async (courseId: string) => {
      try {
        if (!courseId) {
          throw new Error("Course ID is required");
        }

        const result = await getTestAssessment(courseId);
        return result;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while fetching the test assessment.");
      }
    },
  };
};
