import { EnrollmentEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDependencies";

export const addEnrollmentUseCase = (dependencies: IDependencies) => {
  const {
    repositories: {enrollmentCreated},
  } = dependencies;
  return {
    execute: async (data: EnrollmentEntity) => {
      try {      
        const result=await enrollmentCreated(data)        
        return result
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
      }
    },
  };
};