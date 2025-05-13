import { CourseEntity } from "../../../domain/entities";
import { createCourse } from "../../database/repositories";
import { createChatRoom } from "../../database/repositories/createChatRoom";

export const courseCreatedConsumer = async (data: CourseEntity) => {
  try {
    await createCourse(data);
    await createChatRoom(data);

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
