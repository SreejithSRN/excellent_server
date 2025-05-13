import { UserEntity } from "../entities";

export interface IRegisterFormUseCase{
    execute(data:UserEntity):Promise<boolean |null>
}