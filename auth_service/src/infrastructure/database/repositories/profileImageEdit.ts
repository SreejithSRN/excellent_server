import { UserEntity } from "../../../domain/entities";
import userCreatedProducer from "../../kafka/producer/userCreatedProducer";
import { User } from "../models";

export const profileImageEdit=async(image:string, email:string ):Promise<boolean|string|UserEntity>=>{
    try {

        console.log(image, email,"iam in the repository of profile image edit")

        const result = await User.findOneAndUpdate(
            { email: email }, 
            { $set: { "profile.avatar": image } }, 
            { new: true } 
          );          

        if(result){
           await userCreatedProducer(result)
            return result
        }else{
            return false
        }
        
        
    }catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          throw error;
        }
        throw new Error("An unexpected error occurred");
      }
}