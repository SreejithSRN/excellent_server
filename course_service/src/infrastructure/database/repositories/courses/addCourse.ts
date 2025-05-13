import { CourseEntity } from "../../../../domain/entities/courseEntity";
import createCourseProduce from "../../../kafka/producer/createCourseProduce";
import { Course } from "../../models/courseModel";

export const addCourse = async (data: CourseEntity) => {
  try {
    console.log(data, "data in the course repo");

    if (data.id) {
      // 🔄 Update existing course
      const updatedCourse = await Course.findByIdAndUpdate(
        data.id,
        {
          title: data.title,
          description: data.description,
          categoryRef: data.categoryRef,
          instructorRef: data.instructorRef,
          language: data.language,
          level: data.level,
          pricing: {
            amount: data?.pricing?.amount || 0,
            type: data?.pricing?.type || "free",
          },
          thumbnail: data.thumbnail,
          lessons: data.lessons?.map((lesson) => ({
            lessonNumber:lesson.lessonNumber,
            title: lesson.title,
            description: lesson.description,
            video: lesson.video,
            duration: lesson.duration,
          })),
          isBlocked: data.isBlocked || false,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedCourse) {
        console.log("Course update failed.");
        return false;
      }
      const { createdAt, updatedAt, ...course } = updatedCourse.toObject();

      await createCourseProduce(course)
            console.log("I reached here after kafka produce")
            return true

      // return !!updatedCourse;
    } else {
      // ✨ Create new course
      const newCourse = new Course({
        title: data.title,
        description: data.description,
        categoryRef: data.categoryRef,
        instructorRef: data.instructorRef,
        language: data.language,
        level: data.level,
        pricing: {
          amount: data?.pricing?.amount || 0,
          type: data?.pricing?.type || "free",
        },
        thumbnail: data.thumbnail,
        lessons: data.lessons?.map((lesson) => ({
          lessonNumber:lesson.lessonNumber,
          title: lesson.title,
          description: lesson.description,
          video: lesson.video,
          duration: lesson.duration,
        })),
        isBlocked: data.isBlocked || false,
      });

      const savedCourse = await newCourse.save();
      const { createdAt, updatedAt, ...course } = savedCourse.toObject();

      await createCourseProduce(course)
            console.log("I reached here after kafka produce")
      return !!savedCourse;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};










