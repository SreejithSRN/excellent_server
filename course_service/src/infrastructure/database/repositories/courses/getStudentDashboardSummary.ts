import { StudentStats } from "../../../../domain/entities/courseDashboardDataEntity";

import mongoose from "mongoose";
import { Course, Enrollment } from "../../models";
import { Assessment } from "../../models/assesmentModel";

export const getStudentDashboardSummary = async (
  studentId: string
): Promise<StudentStats | null> => {
  try {
    // Total enrollments (courses purchased)
    const enrollments = await Enrollment.find({ studentId });

    const totalPurchasedCourses = enrollments.length;

    // Get unique instructor IDs from purchased courses
    const courseIds = enrollments.map((e) => e.courseId);
    const courses = await Course.find({ _id: { $in: courseIds } });

    const instructorIds = [
      ...new Set(courses.map((course) => course.instructorRef.toString())),
    ];

    const totalInstructors = instructorIds.length;

    // Count paid and free courses
    const paidCourses = courses.filter(
      (course) => course.pricing?.type === "paid"
    ).length;
    const freeCourses = courses.filter(
      (course) => course.pricing?.type === "free"
    ).length;

    // Assessments
    const assessments = await Enrollment.find({
      studentId: new mongoose.Types.ObjectId(studentId),
    });

    const totalAssessments = assessments.length;
    const completedAssessments = assessments.filter(
      (a) => a.isTestCompleted
    ).length;
    const pendingAssessments = totalAssessments - completedAssessments;

    // Last 5 purchased courses
    const recentEnrollments = await Enrollment.find({ studentId })
      .sort({ enrolledAt: -1 })
      .limit(5)
      .populate({
        path: "courseId",
        select: "title instructorRef",
        populate: {
          path: "instructorRef",
          select: "firstName lastName",
        },
      });

      const recentPurchases = recentEnrollments.map((e) => {
        const course = e.courseId as any;
        const instructor = course.instructorRef as any;
      
        return {
          courseTitle: course?.title || "Untitled",
          instructorName: `${instructor?.firstName || ""} ${instructor?.lastName || ""}`.trim(),
          purchaseDate: e.enrolledAt ? new Date(e.enrolledAt).toISOString() : "",
        };
      });
    // Monthly purchase history (group by month)
    const monthlyAggregation = await Enrollment.aggregate([
      {
        $match: {
          studentId: new mongoose.Types.ObjectId(studentId),
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$enrolledAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const monthlyPurchases = monthlyAggregation.map((entry) => ({
      month: entry._id,
      count: entry.count,
    }));

    

    // Return the full student dashboard stats
    return {
      totalPurchasedCourses,
      totalInstructors,
      paidCourses,
      freeCourses,
      totalAssessments,
      completedAssessments,
      pendingAssessments,
      recentPurchases,
      monthlyPurchases,
    };
  } catch (error: unknown) {
    console.error("Dashboard summary error:", error);
    if (error instanceof Error) throw error;
    throw new Error(
      "An unexpected error occurred while generating dashboard summary"
    );
  }
};
