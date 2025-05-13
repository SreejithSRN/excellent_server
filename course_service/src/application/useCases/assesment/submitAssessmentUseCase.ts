
import { IDependencies } from "../../interfaces/IDependencies";

interface SubmitAssessmentInput {
  courseId: string;
  answers: string[];
  studentId:string
}

export const submitAssessmentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getsubmitAssessment },
  } = dependencies;

  return {
    execute: async ({ courseId, answers,studentId }: SubmitAssessmentInput) => {
      try {
        if (!courseId) {
          throw new Error("Course ID is required");
        }

        if (!Array.isArray(answers) || answers.length === 0) {
          throw new Error("Answers array is required and cannot be empty");
        }

        const { assessment, score,mark,isPassed } = await getsubmitAssessment(courseId, answers,studentId);

        return { score,mark,isPassed  };
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred while submitting the assessment.");
      }
    },
  };
};

