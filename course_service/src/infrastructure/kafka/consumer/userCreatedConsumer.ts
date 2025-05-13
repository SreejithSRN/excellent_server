import { UserEntity } from "../../../domain/entities";
import { createUser } from "../../database/repositories";

export const userCreatedConsumer = async (data: UserEntity) => {
  try {
    await createUser(data);

    console.log("==========");
    console.log("user-created-consumed");
    console.log("==========");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in userCreatedConsumer:", error.message);
      console.error(error.stack);
    } else {
      console.error("Unknown error in userCreatedConsumer:", error);
    }
  }
};
