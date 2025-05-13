import { constant } from "../../../_lib/common/constant";
import { IDependencies } from "../../interfaces/IDependencies";

export const toggleBlockCourseUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { toggleBlockCourse },
  } = dependencies;
  return {
    execute: async (id: string) => {
      try {
        console.log(id, "iam from toggleBlockCourse Usecase");
        const result = await toggleBlockCourse(id);
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
