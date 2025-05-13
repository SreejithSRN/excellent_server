import { ReviewRate } from "../../../domain/entities/reviewEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const reviewRateUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { reviewRate },
  } = dependencies;
  return {
    execute: async (data: ReviewRate) => {
      try {
        const result = await reviewRate(data);
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
