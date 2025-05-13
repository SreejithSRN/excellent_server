export interface IToggleBlockCourseUseCase{
    execute(id:string):Promise<boolean|null|string>
}