import { UserEntity } from "../entities";

export interface IGetStudentsUseCase {
  execute(
    page?: number,
    limit?: number,
    search?:string
  ): Promise<{ data: UserEntity[]; totalCount: number } | null>;
}
