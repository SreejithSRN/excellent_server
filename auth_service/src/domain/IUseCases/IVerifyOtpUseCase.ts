export interface IVerifyOtpUseCase {
    execute(otp:string |number,email:string):Promise<boolean |null>
}