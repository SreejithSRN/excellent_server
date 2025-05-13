import { UserEntity } from "../../../domain/entities";
import { User } from "../models";


export const getStudents = async (
  page?: number,
  limit?: number,
  search?: string
): Promise<{ data: UserEntity[]; totalCount: number } | null> => {
  try {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 ? limit : 10;
    const skipNo = (validPage - 1) * validLimit;

    // 🔍 Build search filter
    const searchFilter = search
      ? {
          role: "student",
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : { role: "student" };

    const [data, totalCount] = await Promise.all([
      User.find(searchFilter)
        .sort({ updatedAt: "descending" })
        .skip(skipNo)
        .limit(validLimit),
      User.countDocuments(searchFilter),
    ]);

    return { data, totalCount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return null;
  }
};
