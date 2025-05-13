import { ChatRoomEntity } from "../../domain/entities";

export interface IRepositories{
    getRooms:(id:string)=>Promise<ChatRoomEntity[]|null>
    addChat:(data:{roomId: string, sender: string,text: string})=>Promise<boolean|null>
    addMember:(studentId:string,courseId:string)=>Promise<boolean|null>
    
}