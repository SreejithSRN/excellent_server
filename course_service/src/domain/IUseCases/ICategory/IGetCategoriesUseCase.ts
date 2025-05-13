import { CategoryEntity } from "../../entities";

export interface IGetCategoriesUseCase {
    execute(
      page?: number,
      limit?: number,
      search?:string
    ): Promise<{ data: CategoryEntity[]; totalCount: number } | null>;
  }