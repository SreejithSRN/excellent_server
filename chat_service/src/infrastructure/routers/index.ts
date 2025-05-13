import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controllers } from "../../presentation/controllers";

export const routes= (dependencies:IDependencies)=>{
    const{getRooms,addChat,addMember}=controllers(dependencies)

    const router = Router();
    router.route("/rooms").get(getRooms)
    router.route("/send").post(addChat)
    router.route("/addtochatroom").post(addMember)

    return router;
    
}