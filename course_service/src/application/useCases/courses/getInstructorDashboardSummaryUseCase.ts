import { InstructorCourseStats } from "../../../domain/entities/courseDashboardDataEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getInstructorDashboardSummaryUseCase = (dependencies: IDependencies) => {
  const {repositories:{getInstructorDashboardSummary}} = dependencies;
  return {
    execute: async (id:string ): Promise<InstructorCourseStats | null > => {
      try {
         
        
        let result = await getInstructorDashboardSummary(id);
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
