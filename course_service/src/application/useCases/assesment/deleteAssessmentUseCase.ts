import { IDependencies } from "../../interfaces/IDependencies";

export const deleteAssessmentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { deleteAssessmentById},
  } = dependencies;

  return {
    execute: async (assessmentId: string): Promise<boolean> => {
      try {
        if (!assessmentId) {
          throw new Error("Assessment ID is required.");
        }

        const deleted = await deleteAssessmentById(assessmentId);

        if (!deleted) {
          throw new Error("Assessment deletion failed or assessment not found.");
        }

        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(`DeleteAssessmentUseCase Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred during assessment deletion.");
      }
    },
  };
};
