import { PasswordChangeEntity, UserEntity } from "../../domain/entities";

export interface IRepositories {
  createOtp: (email: string, otp: string | number) => Promise<boolean | null>;
  findByEmail: (email: string) => Promise<UserEntity | null>;
  checkByName:(name:string)=> Promise<boolean|null>
  verifyOtp:(otp:string|number,email:string)=> Promise<boolean |null>
  createUser:(data:UserEntity)=> Promise<UserEntity |null>
  getStudents:(page?:number,limit?:number,search?:string)=> Promise<{data:UserEntity[],totalCount:number} | null>
  getInstructors:(page?:number,limit?:number,search?:string)=> Promise<{data:UserEntity[],totalCount:number} | null>
  blockUnblock:(email:string)=>Promise<boolean|null>
  approveReject:(email:string,reason:string)=>Promise<boolean|null>
  registerForm:(data:UserEntity)=>Promise<boolean|null>
  profileEdit:(data:UserEntity)=>Promise<UserEntity|null>
  passwordChange:(data:PasswordChangeEntity)=>Promise<boolean|null|string>
  profileImageEdit:(image:string,email:string)=>Promise<boolean|string|UserEntity>
}
