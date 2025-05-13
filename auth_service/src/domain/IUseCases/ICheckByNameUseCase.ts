export interface ICheckByNameUseCase {
  execute(name: string): Promise<boolean | null>;
}
