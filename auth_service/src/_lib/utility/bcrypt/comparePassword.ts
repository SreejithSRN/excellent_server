const bcrypt=require("bcryptjs")

export const comparePassword= async(original:string, encrypted:string)=>{
    try {
        const match=await bcrypt.compare(original,encrypted)
        if(!match){
            return false
        }
        return true
        
    }catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
      }
}