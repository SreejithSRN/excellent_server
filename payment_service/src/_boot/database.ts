import mongoose from "mongoose";
import { env_variables } from "./config";

export default async () => {
  try {
    const mongoUrl = env_variables.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error(" MongoDB Connection String not available");
    }
    let Connection = await mongoose.connect(mongoUrl.trim());
    if (Connection) {
      console.log("MongoDB_Payment_Service connected Successfully");
    }
  } catch (error: any) {
    console.error("MongoDB_Payment_Service connection failed");
    console.error("Error Message:", error.message);
    console.error("Full Error:", error); 
    if (error.cause) console.error("Cause:", error.cause); 
    process.exit(1);
  }  
};