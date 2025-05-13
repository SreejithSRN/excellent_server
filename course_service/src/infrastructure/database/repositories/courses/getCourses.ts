import {
  CourseEntity,
  CourseFilterEntity,
} from "../../../../domain/entities/courseEntity";
import { Course } from "../../models/courseModel";

import { Types } from "mongoose";
import { User } from "../../models/userModel";
import { Category } from "../../models";

export const getCourses = async (
  page?: number,
  limit?: number,
  filters?: CourseFilterEntity
): Promise<{ data: CourseEntity[]; totalCount: number } | null> => {
  try {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 ? limit : 10;
    const skipNo = (validPage - 1) * validLimit;

    const query: any = {};

    // Search by course title (case-insensitive)
    if (filters?.search) {
      query.title = { $regex: filters.search, $options: "i" };
    }

    // Filter by category
    if (filters?.category && filters.category !== "all") {
      query.categoryRef = filters.category;
    }

    // Filter by pricing type (free or paid)
    if (filters?.pricing === "free") {
      query["pricing.amount"] = 0;
    } else if (filters?.pricing === "paid") {
      query["pricing.amount"] = { $gt: 0 };
    }

    // Filter by price range (only for paid)
    if (filters?.pricing === "paid") {
      query["pricing.amount"] = {
        ...query["pricing.amount"],
        $gte: filters.minPrice ?? 0,
        $lte: filters.maxPrice ?? Infinity,
      };
    }

    // Filter by level
    if (filters?.level && filters.level !== "all") {
      query.level = filters.level;
    }

    // Sorting
    let sortQuery: any = { updatedAt: -1 }; // Default sort: newest first
    if (filters?.sort === "asc") {
      sortQuery = { title: 1 };
    } else if (filters?.sort === "desc") {
      sortQuery = { title: -1 };
    }

    const [rawData, totalCount] = await Promise.all([
      Course.find(query)
        .populate("categoryRef")
        .populate("instructorRef")
        .sort(sortQuery)
        .collation({ locale: "en", strength: 2 }) 
        .skip(skipNo)
        .limit(validLimit)
        .lean(),
      Course.countDocuments(query),
    ]);

    const data: CourseEntity[] = rawData.map((course) => ({
      ...course,
      _id: (course._id as Types.ObjectId).toString(),
      categoryRef: course.categoryRef
        ? (course.categoryRef as { _id: Types.ObjectId })._id.toString()
        : undefined,
      instructorRef: course.instructorRef
        ? (course.instructorRef as { _id: Types.ObjectId })._id.toString()
        : undefined,
      lessons: course.lessons?.length ? [course.lessons[0]] : [],
    }));

    return { data, totalCount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return null;
  }
};




