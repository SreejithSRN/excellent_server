export interface IApproveRejectUseCase{
    execute(email:string,reason:string):Promise<boolean|null>
}