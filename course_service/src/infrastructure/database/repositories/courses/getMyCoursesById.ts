import { Course } from "../../models";
import { CourseEntity, Language, Level } from "../../../../domain/entities/courseEntity";

export const getMyCoursesById = async (data: string): Promise<CourseEntity> => {
  try {
    const result = await Course.findOne({ _id: data })
      .populate("categoryRef")
      .populate("instructorRef");

    if (!result) {
      throw new Error("Something went wrong while fetching the course details in repository");
    }

    const courseData = result.toObject();

    const sanitizedLessons = courseData.lessons.map((lesson: any) => ({
      _id: lesson._id.toString(),
      lessonNumber: lesson.lessonNumber,
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      video: "", // Placeholder, handle if needed
    }));

    const sanitizedCourse: CourseEntity = {
      _id: courseData._id.toString(),
      title: courseData.title,
      description: courseData.description,
      categoryRef: courseData.categoryRef,
      instructorRef: courseData.instructorRef,
      language: courseData.language as Language,
      level: courseData.level as Level,
      pricing: courseData.pricing,
      thumbnail: courseData.thumbnail,
      lessons: sanitizedLessons,
      isBlocked: courseData.isBlocked,
    };

    return sanitizedCourse;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
