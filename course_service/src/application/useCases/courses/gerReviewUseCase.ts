import { IDependencies } from "../../interfaces/IDependencies";

export const getReviewUseCase = (dependencies: IDependencies) => {
  const {
    repositories: {getReview},
  } = dependencies;
  return {
    execute: async (id:string) => {
      try {
        const result = await getReview(id);
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