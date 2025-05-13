export interface IBlockUnblockUseCase{
    execute(email:string):Promise<boolean|null>
}