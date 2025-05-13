import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const findByEmailUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { findByEmail },
  } = dependencies;
  return {
    execute: async (email: string) => {
      try {
        
        return await findByEmail(email)
      } catch (error: constant) {
        throw new Error(error?.message || "Email search failed");
      }
    },
  };
};
