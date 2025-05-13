import { UserEntity } from "../entities";

export interface ILoginUserCase{
    execute(email:string,password:string):Promise<UserEntity | string | null>
}