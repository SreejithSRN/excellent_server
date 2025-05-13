import { PasswordChangeEntity } from "../entities";

export interface IPasswordChangeUseCase{
    execute(data:PasswordChangeEntity):Promise<boolean|null|string>
}