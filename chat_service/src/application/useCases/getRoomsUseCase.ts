import { ChatRoomEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const getRoomsUseCase = (dependencies: IDependencies) => {
    const {repositories:{getRooms}} = dependencies;
    return {
      execute: async (id:string): Promise<ChatRoomEntity[] | null> => {
        try {
          
          let result = await getRooms(id);
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