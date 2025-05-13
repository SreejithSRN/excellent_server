import { ChatRoomEntity } from "../entities";

export interface IGetRoomsUseCase {
    execute(id:string): Promise<ChatRoomEntity[]| null>;
  }