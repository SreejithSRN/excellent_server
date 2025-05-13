import { IDependencies } from "../../interfaces/IDependencies";

export const reviewReactUseCase = (dependencies: IDependencies) => {
  const {
    repositories: {reviewReact},
  } = dependencies;
  return {
    execute: async (id:string,type:string,studentId:string) => {
      try {       
        const result = await reviewReact(id,type,studentId);
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