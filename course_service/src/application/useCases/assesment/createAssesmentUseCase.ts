import { AssessmentEntity } from "../../../domain/entities/assesmentEntity";
import { IDependencies } from "../../interfaces/IDependencies";


export const createAssessmentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { createAssessment },
  } = dependencies;

  return {
    execute: async (data: AssessmentEntity) => {
      try {
        const { courseRef, questions } = data;

        if (!courseRef || !questions || questions.length === 0) {
          throw new Error("Course ID and questions are required.");
        }

        const newAssessment: AssessmentEntity = {
          courseRef,
          questions,
        };

        const result = await createAssessment(newAssessment);
        return result;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while creating assessment.");
      }
    },
  };
};
