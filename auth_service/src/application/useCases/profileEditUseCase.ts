import { constant } from "../../_lib/common/constant";
import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const profileEditUseCase = (dependencies: IDependencies) => {
  const { repositories } = dependencies;
  const {profileEdit} = repositories;

  return {
    execute: async (data: UserEntity) => {
      try {  
        console.log(data,"iam fro profile edit use case ...........today")    
        const result=await profileEdit(data)
        if (result){
            return result
        }else{
            throw new Error("something went wrong while updating")
        }  
      } catch (error: constant) {
        throw new Error(error?.message || "Error in checking with name");
      }
    },
  };
};
