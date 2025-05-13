import { IDependencies } from "../interfaces/IDependencies";

export const addChatUseCase = (dependencies: IDependencies) => {
    const { repositories: { addChat} } = dependencies;
    return {
      execute: async (data: { roomId: string; sender: string; text: string; }): Promise<boolean | null> => {
        try {           
          const result = await addChat(data); 
          return result
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("An unknown error occurred");
        }
      },
    };
  };
  