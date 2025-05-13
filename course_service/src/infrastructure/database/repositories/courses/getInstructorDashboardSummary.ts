import { InstructorCourseStats } from '../../../../domain/entities/courseDashboardDataEntity';
import { Course, Enrollment } from '../../models';
import { Assessment } from '../../models/assesmentModel';

export const getInstructorDashboardSummary = async (
  instructorId: string
): Promise<InstructorCourseStats | null> => {
  try {
    const courses = await Course.find({ instructorRef: instructorId, isBlocked: false });

    const totalCourses = courses.length;

    const totalAssessments = await Assessment.countDocuments({
      courseRef: { $in: courses.map(c => c._id) },
    });

    // Get student count per course
    const enrollmentData = await Enrollment.aggregate([
      {
        $match: {
          courseId: { $in: courses.map(c => c._id) },
        },
      },
      {
        $group: {
          _id: '$courseId',
          studentCount: { $sum: 1 },
        },
      },
    ]);

    const studentPerCourse = courses.map(course => {
      const enrollment = enrollmentData.find(e => e._id.toString() === course._id.toString());
      return {
        courseTitle: course.title,
        studentCount: enrollment ? enrollment.studentCount : 0,
      };
    });

    // Get unique student count across all courses
    const uniqueStudentData = await Enrollment.aggregate([
      {
        $match: {
          courseId: { $in: courses.map(c => c._id) },
        },
      },
      {
        $group: {
          _id: '$studentId', // group by studentId to ensure uniqueness
        },
      },
    ]);

    const totalStudents = uniqueStudentData.length;

    // Get recent 5 updated courses
    const recentCourses = courses
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5)
      .map(course => ({
        title: course.title,
        updatedAt: course.updatedAt.toISOString(),
      }));

    return {
      totalCourses,
      totalStudents,
      totalAssessments,
      studentPerCourse,
      recentCourses,
    };
  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error('An unexpected error occurred while generating dashboard summary');
  }
};
