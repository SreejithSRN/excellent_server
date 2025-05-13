export interface CourseDashboardData  {
    totalStudents?: number;
    totalInstructors?: number;
    totalCourses?: number;
    totalCategories?: number;
    monthlySignups?: { month: string; students: number }[];
    courseCategories?: { name: string; value: number }[];
  };

  export interface InstructorCourseStats  {
    totalCourses: number;
    totalStudents: number;
    totalAssessments: number;
    studentPerCourse: { courseTitle: string; studentCount: number }[];
    recentCourses: { title: string; updatedAt: string }[];
  };


  export interface StudentStats  {
    totalPurchasedCourses: number;
    totalInstructors: number;
    paidCourses: number;
    freeCourses: number;
    totalAssessments: number;
    completedAssessments: number;
    pendingAssessments: number;
    recentPurchases: {
      courseTitle: string;
      instructorName: string;
      purchaseDate: string;
    }[];
    monthlyPurchases: {
      month: string;
      count: number;
    }[];
  };