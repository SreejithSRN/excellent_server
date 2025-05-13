import { IDependencies } from "../../interfaces/IDependencies";

export const reviewCommentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: {reviewComment},
  } = dependencies;
  return {
    execute: async (id:string,commentText:string,studentId:string) => {
      try {       
        const result = await reviewComment(id,commentText,studentId);
        return result;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
      }
    },
  };
};