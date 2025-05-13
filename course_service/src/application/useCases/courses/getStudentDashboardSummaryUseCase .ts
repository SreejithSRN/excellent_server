
import { StudentStats } from "../../../domain/entities/courseDashboardDataEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getStudentDashboardSummaryUseCase = (dependencies: IDependencies) => {
  const {repositories:{getStudentDashboardSummary}} = dependencies;
  return {
    execute: async (id:string ): Promise<StudentStats| null > => {
      try {
         
        
        let result = await getStudentDashboardSummary(id);
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
