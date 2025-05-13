import { CategoryEntity } from "../../../../domain/entities";
import { Category } from "../../models";

export const addCategory=async(data:CategoryEntity)=>{
    try {

        console.log(data,"iam from repository add category")
        const catName=data.name.trim()
        const isExisting=await Category.findOne({name:catName})
        console.log(isExisting,"iam from repository add category....................??????")

          if (isExisting && data.name===isExisting.name){
              return "Category already exist, try another name"
          }   

        const newData={...data,name:catName}
        const {_id,...updateData}=newData

        const result =data._id? await Category.findOneAndUpdate(
            { _id:data._id  }, // Match based on _id if provided
            newData, // Update fields with new data
            { upsert: true, new: true, setDefaultsOnInsert: true } // Options
          ):await Category.create(updateData);



        // const created=await Category.create(newData)
        if (!result){
            return "Error Occured, try again....."
        }
        
        return "Category updated sucessfully....."
        
    } catch (error: unknown) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("An unexpected error occurred");
      }

}







