import { constant } from "../../../_lib/common/constant";
import { CategoryEntity } from "../../../domain/entities";
import { IDependencies } from "../../interfaces/IDependencies";

export const getCategoriesUseCase = (dependencies: IDependencies) => {
  const {repositories:{getCategories}} = dependencies;
  return {
    execute: async (
      page?: number,
      limit?: number,
      search?:string
    ): Promise<{ data: CategoryEntity[]; totalCount: number } | null> => {
      try {
        console.log(page, limit,search);
        let result = await getCategories(page, limit,search);
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
