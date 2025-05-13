
import { CourseDashboardData } from "../../../domain/entities/courseDashboardDataEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getAdminDashboardSummaryUseCase = (dependencies: IDependencies) => {
  const {repositories:{getAdminDashboardSummary}} = dependencies;
  return {
    execute: async ( ): Promise<CourseDashboardData | null > => {
      try {
         console.log("I am HERE NOWWWWWW W in usecase   ===================================================")
        
        let result = await getAdminDashboardSummary();
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
