
import { CourseEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const addCourseUseCase = (dependencies: IDependencies) => {
  const {
    repositories: {addCourse},
  } = dependencies;
  return {
    execute: async (data: CourseEntity) => {
      try {
        console.log(data,"iam from addcourseusecase......")
        const result=await addCourse(data)
        console.log(result,"iam in addcourse repository")
        return result
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
      }
    },
  };
};
