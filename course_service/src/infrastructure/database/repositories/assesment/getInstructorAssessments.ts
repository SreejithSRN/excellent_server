import mongoose from "mongoose";
import { AssessmentView } from "../../../../domain/entities/assesmentEntity";
import { Course, Enrollment } from "../../models";
import { Assessment } from "../../models/assesmentModel";

export const getInstructorAssessments = async (
  instructorId: string,
  searchTerm: string
): Promise<AssessmentView[]> => {
  try {
    if (!instructorId) throw new Error("Instructor Id is required");

    // Step 1: Get all courses by this instructor
    const courses = await Course.find({ instructorRef: instructorId });

    const courseIds = courses.map(course => new mongoose.Types.ObjectId(course._id));

    const enrollments = await Enrollment.find({ courseId: { $in: courseIds } })
      .populate("studentId")
      .populate({
        path: "courseId",
        populate: {
          path: "instructorRef",
          model: "User"
        }
      });

    // Step 2: Build the raw result
    let result: AssessmentView[] = enrollments.map((enrollment: any) => {
      const course = enrollment.courseId;
      const student = enrollment.studentId;

      return {
        courseTitle: course?.title || "",
        instructorName: course?.instructorRef?.name || "N/A",
        lessonsCount: course?.lessons?.length || 0,
        status: enrollment.isTestCompleted,
        mark: enrollment.mark,
        certificateUrl: enrollment.certificateUrl || "",
        studentName: student?.name || "",
        studentEmail: student?.email || "",
      };
    });

    // Step 3: Filter by search term (case-insensitive match)
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(item =>
        item.courseTitle?.toLowerCase().includes(lowerSearch) ||
        item.studentName?.toLowerCase().includes(lowerSearch)
      );
    }

    return result;
  } catch (err) {
    console.error("Error in getInstructorAssessments:", err);
    throw err;
  }
};
