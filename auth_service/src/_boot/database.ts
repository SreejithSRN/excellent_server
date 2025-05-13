import mongoose from "mongoose";
import { env_variables } from "./config";
import { messages } from "../_lib/common/messages";

export default async () => {
  try {
    const mongoUrl = env_variables.MONGODB_URL;
    if (!mongoUrl) {
      throw new Error(messages.MongoDB_String_Error);
    }
    const connection = await mongoose.connect(mongoUrl.trim());
    console.log(messages.connection_Auth);
  } catch (error: unknown) {
    console.error(messages.Mongo_AuthService_Failed);

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(messages.Unknown_Error);
    }
    
    process.exit(1);
  }
};
