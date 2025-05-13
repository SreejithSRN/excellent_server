import { UserEntity } from "../entities";

export interface IProfileImageEditUseCase{
    execute(image:string,email:string):Promise<boolean|String|UserEntity>
}