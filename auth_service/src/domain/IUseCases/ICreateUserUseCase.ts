import { UserEntity } from "../entities";

export interface IcreateUserUsecase {
    execute(data:UserEntity):Promise<UserEntity |null>
}