
import { CourseEntity, CourseFilterEntity } from "../../../../domain/entities/courseEntity";
import { Course } from "../../models/courseModel";
import { Types } from "mongoose";


export const getCoursesForInstructor = async (
  page?: number,
  limit?: number,
  id?: string,
  filters?: CourseFilterEntity
): Promise<{ data: CourseEntity[]; totalCount: number } | null> => {
  try {

    console.log(">>>>>>>>>>in the repoooooooo >>>>>>>>",filters)
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 ? limit : 10;
    const skipNo = (validPage - 1) * validLimit;

    if (!id || !Types.ObjectId.isValid(id)) {
      console.warn("Invalid or missing ID provided.");
      return { data: [], totalCount: 0 };
    }

    const objectId = new Types.ObjectId(id);

    // 👇 Build dynamic filter
    const filterQuery: any = {
      instructorRef: objectId,
    };

    if (filters) {
      const {
        search,
        category,
        pricing,
        level,
        minPrice,
        maxPrice,
        sort
      } = filters;

      // 🔍 Search by title (case insensitive)
      if (search && search.trim() !== "") {
        filterQuery.title = { $regex: search, $options: "i" };
      }

      // 📂 Filter by category
      if (category && category !== "all") {
        filterQuery.categoryRef = category;
      }

      // 🎚️ Filter by level
      if (level && level !== "all") {
        filterQuery.level = level;
      }

      // 💸 Filter by pricing type
      if (pricing && pricing !== "all") {
        filterQuery["pricing.type"] = pricing;
      }

      // 💰 Filter by price range (only for paid courses)
      if (pricing === "paid") {
        const priceRange: any = {};
        if (minPrice !== undefined) priceRange.$gte = minPrice;
        if (maxPrice !== undefined) priceRange.$lte = maxPrice;

        if (Object.keys(priceRange).length > 0) {
          filterQuery["pricing.amount"] = priceRange;
        }
      }     
      
    }

    const [rawData, totalCount] = await Promise.all([
      Course.find(filterQuery)
        .populate("categoryRef")
        .populate("instructorRef")
        .sort(
          filters?.sort === "asc"
            ? { title: 1 }
            : filters?.sort === "desc"
            ? { title: -1 }
            : { updatedAt: -1 }
        )
        .collation({ locale: "en", strength: 2 }) 
        .skip(skipNo)
        .limit(validLimit)
        .lean(),
    
      Course.countDocuments(filterQuery),
    ]);
    

    if (!rawData.length) {
      return { data: [], totalCount: 0 };
    }

    const data: CourseEntity[] = rawData.map((course) => ({
      ...course,
      _id: (course._id as Types.ObjectId).toString(),
      categoryRef: course.categoryRef
        ? (course.categoryRef as { _id: Types.ObjectId })._id.toString()
        : undefined,
      instructorRef: course.instructorRef
        ? (course.instructorRef as { _id: Types.ObjectId })._id.toString()
        : undefined,
    }));

    return { data, totalCount };
  } catch (error: unknown) {
    console.error("Error in getCoursesForInstructor:", error);
    return null;
  }
};
























