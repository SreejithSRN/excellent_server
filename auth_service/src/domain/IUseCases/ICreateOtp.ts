// export interface ICreateOtp{
//     execute:(email:string,otp:string|number)=>Promise<boolean>
// }

export interface ICreateOtp {
  execute(email: string, otp: string | number): Promise<boolean | null>;
}
