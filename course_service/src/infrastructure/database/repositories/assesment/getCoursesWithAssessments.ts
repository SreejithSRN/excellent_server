import { Course } from "../../models";
import { Assessment } from "../../models/assesmentModel";

export const getCoursesWithAssessments = async (instructorId: string) => {
  try {
    // Step 1: Fetch courses by instructor (get full lessons so we can remove video field)
    const courses = await Course.find({ instructorRef: instructorId })
      .select("title pricing lessons")
      .lean();

    const courseIds = courses.map((course) => course._id);

    // Step 2: Get assessments for those course IDs
    const assessments = await Assessment.find({
      courseRef: { $in: courseIds },
    }).lean();

    // Step 3: Map only courses that have an assessment
    const courseWithAssessments = courses
      .map((course) => {
        const relatedAssessment = assessments.find(
          (assessment) => assessment.courseRef.toString() === course._id.toString()
        );

        if (!relatedAssessment) return null; // skip if no assessment

        // Remove video field from each lesson
        const lessonsWithoutVideo = course.lessons?.map((lesson: any) => {

          const { video, ...rest } = lesson;
          return rest;
        });

        return {
          ...course,
          lessons: lessonsWithoutVideo || [],
          assessment: relatedAssessment,
        };
      })
      .filter(Boolean); // remove nulls (courses without assessments)

    console.log("Filtered courses with assessments:", courseWithAssessments);
    return courseWithAssessments;
  } catch (err) {
    console.error("Error in getCoursesWithAssessments:", err);
    throw err;
  }
};

