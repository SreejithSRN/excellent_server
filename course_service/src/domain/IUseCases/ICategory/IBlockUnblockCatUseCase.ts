export interface IBlockUnblockCatUseCase{
    execute(id:string):Promise<boolean|null>
}