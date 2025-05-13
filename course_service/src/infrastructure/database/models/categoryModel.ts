import { model, Schema } from "mongoose";
import { CategoryEntity } from "../../../domain/entities";
import { boolean } from "yup";


const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique: true,
    },
    status:{
        type: String,
        enum: ["active","blocked"],
        default:"active"
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        requiredL:true
    } ,
    isBlocked:{
        type:Boolean,
        required:true,
        default:false
    }   
},{
    timestamps:true
}
)
export const Category=model<CategoryEntity>("categories",categorySchema)