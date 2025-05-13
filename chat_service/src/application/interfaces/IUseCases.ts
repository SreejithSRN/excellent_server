import { IAddChatUseCase, IGetRoomsUseCase,IAddMemberUseCase } from "../../domain/IUseCases";
import { IDependencies } from "./IDependencies";

export interface IUseCases{
    getRoomsUseCase:(dependencies:IDependencies)=>IGetRoomsUseCase
    addChatUseCase:(dependencies:IDependencies)=>IAddChatUseCase
    addMemberUseCase:(dependencies:IDependencies)=>IAddMemberUseCase
    
}