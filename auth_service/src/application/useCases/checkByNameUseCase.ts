import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const checkByNameUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { checkByName },
  } = dependencies;
  return {
    execute: async (name: string) => {
      try {
        return await checkByName(name);
      } catch (error: constant) {
        throw new Error(error?.message || "Error in checking with name");
      }
    },
  };
};
