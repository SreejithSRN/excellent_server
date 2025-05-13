import { UserEntity } from "../../../domain/entities";
import userCreatedProducer from "../../kafka/producer/userCreatedProducer";
import { User } from "../models";

export const createUser = async (
  data: UserEntity
): Promise<UserEntity | null> => {
  try {
    const updatedData = {
      ...data,
      isRejected: data.role === "instructor",
      isRequested: data.role === "instructor",
      isVerified: data.role === "student",
    };
    console.log("Processed user data:", updatedData);
    const newUser = await User.create(updatedData);
    console.log("New user data:", newUser);
    return newUser ? newUser : null;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Something went wrong in user creation");
    }
    return null;
  }
};
