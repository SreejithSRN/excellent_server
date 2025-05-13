import { Types } from "mongoose";
import { AssessmentView } from "../../../../domain/entities/assesmentEntity";
import { Enrollment } from "../../models";

export const getStudentAssessments = async (
  studentId: string,
  search?: string
): Promise<AssessmentView[]> => {
  try {
    if (!studentId) throw new Error("Student ID is required");

    const enrollments = await Enrollment.find({
      studentId: new Types.ObjectId(studentId),
    })
      .populate({
        path: "courseId",
        select: "title instructorRef lessons",
        populate: {
          path: "instructorRef",
          select: "name",
        },
      })
      .populate({
        path: "studentId",
        select: "name",
      })
      .lean();

    if (!enrollments || enrollments.length === 0) {
      return [];
    }

    // Format the data
    let formatted: AssessmentView[] = enrollments.map((enroll: any) => ({
      courseTitle: enroll.courseId?.title ?? "Untitled",
      instructorName: enroll.courseId?.instructorRef?.name ?? "N/A",
      lessonsCount: enroll.courseId?.lessons?.length ?? 0,
      status: enroll.isTestCompleted ?? false,
      mark: Array.isArray(enroll.mark) ? enroll.mark : [enroll.mark ?? 0],
      certificateUrl: enroll.certificateUrl ?? null,
      studentName: enroll.studentId?.name ?? "Student",
    }));

    // Filter based on search (case-insensitive match in courseTitle or instructorName)
    if (search && search.trim()) {
      const term = search.toLowerCase();
      formatted = formatted.filter(
        (item) =>
          item.courseTitle?.toLowerCase().includes(term) ||
          item.instructorName?.toLowerCase().includes(term)
      );
    }

    return formatted;
  } catch (err) {
    console.error("Error in getStudentAssessments:", err);
    throw err;
  }
};
