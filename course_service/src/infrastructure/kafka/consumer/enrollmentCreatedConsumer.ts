import { EnrollmentEntity } from "../../../domain/entities";
import { enrollmentCreated } from "../../database/repositories";


export const enrollmentCreatedConsumer = async (data: EnrollmentEntity) => {
  try {
    await enrollmentCreated(data);

    console.log("==========");
    console.log("enrollment-created-consumed");
    console.log("==========");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in enrollmentCreatedConsumer:", error.message);
      console.error(error.stack);
    } else {
      console.error("Unknown error in enrollmentCreatedConsumer:", error);
    }
  }
};