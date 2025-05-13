import { UserEntity } from "../../../../domain/entities";
import { User } from "../../models";


export const createUser = async (data: UserEntity): Promise<UserEntity | null> => {
    try {
        
        console.log("///////////////////////////////////////////// ");
        console.log(" I am here in the repository to save the user ");
        console.log("///////////////////////////////////////////// ");

       
        const updatedUser = await User.findOneAndUpdate(
            { email: data.email }, 
            { $set: data }, 
            { upsert: true, new: true } 
        );

        console.log("User saved successfully:", updatedUser);
        return updatedUser;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in userCreated repository:", error.message);
            console.error(error.stack);
        } else {
            console.error("Unknown error in userCreated repository:", error);
        }
        return null;
    }
};
