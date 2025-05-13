import { UserEntity } from "../entities";

export interface IFindByEmailUseCase {
    execute(email:string): Promise <UserEntity |null>
}