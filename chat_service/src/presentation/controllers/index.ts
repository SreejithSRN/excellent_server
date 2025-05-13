import { IDependencies } from "../../application/interfaces/IDependencies"
import { addChatController } from "./addChat"
import { addMemberController } from "./addMember"
import { getRoomsController, } from "./getRooms"

export const controllers=(dependencies:IDependencies)=>{
    return {
        getRooms:getRoomsController(dependencies),
        addChat:addChatController(dependencies),
        addMember:addMemberController(dependencies)     
    
        
    }
}
