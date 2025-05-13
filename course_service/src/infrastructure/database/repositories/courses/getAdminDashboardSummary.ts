
import { CourseDashboardData } from "../../../../domain/entities/courseDashboardDataEntity";
import { Category, Course, User } from "../../models";

export const getAdminDashboardSummary = async (): Promise<CourseDashboardData> => {
  try {
    // Count totals
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalInstructors = await User.countDocuments({ role: 'instructor' });
    const totalCourses = await Course.countDocuments();
    const totalCategories = await Category.countDocuments();

    // Monthly student signups (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5); // include current month

    const monthlySignupsAgg = await User.aggregate([
      {
        $match: {
          role: 'student',
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%b", date: "$createdAt" } },
          students: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    const monthlySignups = monthlySignupsAgg.map((item) => ({
      month: item._id,
      students: item.students,
    }));

    // Course categories distribution (based on `categoryRef`)
    const courseCategoriesAgg = await Course.aggregate([
      {
        $group: {
          _id: "$categoryRef",
          value: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "categories", // collection name
          localField: "_id",
          foreignField: "_id",
          as: "categoryDetails"
        }
      },
      {
        $unwind: "$categoryDetails"
      },
      {
        $project: {
          name: "$categoryDetails.name",
          value: 1
        }
      }
    ]);

    const courseCategories = courseCategoriesAgg.map((item) => ({
      name: item.name,
      value: item.value,
    }));



    return {
      totalStudents,
      totalInstructors,
      totalCourses,
      totalCategories,
      monthlySignups,
      courseCategories
    };

  } catch (error: unknown) {
    if (error instanceof Error) throw error;
    throw new Error("An unexpected error occurred while generating dashboard summary");
  }
};
