export interface IAddChatUseCase {
    execute(data:{roomId: string, sender: string,text: string}): Promise<boolean| null>;
  }