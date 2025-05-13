export interface IResendOtpUseCase{
    execute(email:string, otp:string |number):Promise<boolean |null>
}