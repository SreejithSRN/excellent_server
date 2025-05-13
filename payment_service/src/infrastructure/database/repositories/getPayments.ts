// import mongoose, { Types } from "mongoose";
// import { Payment } from "../models/paymentModel";
// import { Role } from "../../../domain/entities";
// import { paymentDetailsProps } from "../../../domain/entities/paymentEntity";

// export const getPayments = async (data: {
//   studentId: string;
//   role: string;
//   page?: number;
//   limit?: number;
//   search?:string
// }): Promise<{
//   payments: paymentDetailsProps[];
//   totalCount: number;
//   totalAmount: number;
//   totalCourses: number;
// }> => {
//   try {
//     const { studentId, role, page = 1, limit = 10,search =""} = data;
//     console.log(search,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<iam in repo +++++++++++++++")
//     const skip = (page - 1) * limit;
//     const Id = new Types.ObjectId(studentId);

//     let matchStage = {};
//     if (role === Role.student) {
//       matchStage = { studentId: Id };
//     } else if (role === Role.instructor) {
//       matchStage = { instructorId: Id };
//     }

//     const aggregationPipeline: any[] = [
//       { $match: matchStage },
//       {
//         $lookup: {
//           from: "courses",
//           localField: "courseId",
//           foreignField: "_id",
//           as: "courseDetails",
//         },
//       },
//       { $unwind: "$courseDetails" },
//       {
//         $lookup: {
//           from: "users",
//           localField: role === Role.student ? "instructorId" : "studentId",
//           foreignField: "_id",
//           as: "instructorDetails",
//         },
//       },
//       { $unwind: "$instructorDetails" },
//       { $sort: { createdAt: -1 } },
//       {
//         $facet: {
//           paginatedResults: [
//             {
//               $project: {
//                 _id: 1,
//                 courseTitle: "$courseDetails.title",
//                 amount: 1,
//                 dateOfPurchase: "$createdAt",
//                 receipt: 1,
//                 [role === Role.student
//                   ? "instructorName"
//                   : "studentName"]: "$instructorDetails.name",
//               },
//             },
//             { $skip: skip },
//             { $limit: limit },
//           ],
//           totalCount: [{ $count: "count" }],
//           totalAmount: [{ $group: { _id: null, total: { $sum: "$amount" } } }],
//           uniqueCourses: [
//             {
//               $group: {
//                 _id: null,
//                 uniqueCourses: { $addToSet: "$courseId" },
//               },
//             },
//             {
//               $project: {
//                 totalCourses: { $size: "$uniqueCourses" },
//               },
//             },
//           ],
//         },
//       },
//     ];

//     const results = await Payment.aggregate(aggregationPipeline);
//     const payments = results[0]?.paginatedResults || [];
//     const totalCount = results[0]?.totalCount?.[0]?.count || 0;
//     const totalAmount = results[0]?.totalAmount?.[0]?.total || 0;
//     const totalCourses = results[0]?.uniqueCourses?.[0]?.totalCourses || 0;

//     return { payments, totalCount, totalAmount, totalCourses };
//   } catch (error) {
//     throw new Error((error as Error)?.message);
//   }
// };


import mongoose, { Types } from "mongoose";
import { Payment } from "../models/paymentModel";
import { Role } from "../../../domain/entities";
import { paymentDetailsProps } from "../../../domain/entities/paymentEntity";

export const getPayments = async (data: {
  studentId: string;
  role: string;
  page?: number;
  limit?: number;
  search?:string
}): Promise<{
  payments: paymentDetailsProps[];
  totalCount: number;
  totalAmount: number;
  totalCourses: number;
}> => {
  try {
    const { studentId, role, page = 1, limit = 10,search =""} = data;
    console.log(search,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<iam in repo +++++++++++++++")
    const skip = (page - 1) * limit;
    const Id = new Types.ObjectId(studentId);

    let matchStage = {};
    if (role === Role.student) {
      matchStage = { studentId: Id };
    } else if (role === Role.instructor) {
      matchStage = { instructorId: Id };
    }

    const aggregationPipeline: any[] = [
      { $match: matchStage },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "courseDetails",
        },
      },
      { $unwind: "$courseDetails" },
    
      // ✅ Add course title search stage (case-insensitive)
      ...(search
        ? [
            {
              $match: {
                "courseDetails.title": {
                  $regex: search,
                  $options: "i", // case-insensitive
                },
              },
            },
          ]
        : []),
    
      {
        $lookup: {
          from: "users",
          localField: role === Role.student ? "instructorId" : "studentId",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },
      { $unwind: "$instructorDetails" },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          paginatedResults: [
            {
              $project: {
                _id: 1,
                courseTitle: "$courseDetails.title",
                amount: 1,
                dateOfPurchase: "$createdAt",
                receipt: 1,
                [role === Role.student
                  ? "instructorName"
                  : "studentName"]: "$instructorDetails.name",
              },
            },
            { $skip: skip },
            { $limit: limit },
          ],
          totalCount: [{ $count: "count" }],
          totalAmount: [{ $group: { _id: null, total: { $sum: "$amount" } } }],
          uniqueCourses: [
            {
              $group: {
                _id: null,
                uniqueCourses: { $addToSet: "$courseId" },
              },
            },
            {
              $project: {
                totalCourses: { $size: "$uniqueCourses" },
              },
            },
          ],
        },
      },
    ];
    

    const results = await Payment.aggregate(aggregationPipeline);
    const payments = results[0]?.paginatedResults || [];
    const totalCount = results[0]?.totalCount?.[0]?.count || 0;
    const totalAmount = results[0]?.totalAmount?.[0]?.total || 0;
    const totalCourses = results[0]?.uniqueCourses?.[0]?.totalCourses || 0;

    return { payments, totalCount, totalAmount, totalCourses };
  } catch (error) {
    throw new Error((error as Error)?.message);
  }
};


