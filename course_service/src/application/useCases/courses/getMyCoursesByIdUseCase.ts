
import { CourseEntity } from "../../../domain/entities/courseEntity";
import { IDependencies } from "../../interfaces/IDependencies";

export const getMyCoursesByIdUseCase = (dependencies: IDependencies) => {
  const {
    repositories: { getMyCoursesById },
  } = dependencies;
  return {
    execute: async (data: string): Promise<CourseEntity> => {
      try {
        const result = await getMyCoursesById(data);
        if (!result) {
          throw new Error(
            "Something went wrong while fetching the course details in usecase"
          );
        }      
        return result;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred");
      }
    },
  };
};
