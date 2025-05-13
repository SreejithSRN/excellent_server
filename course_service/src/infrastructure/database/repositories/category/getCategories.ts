import { CategoryEntity } from "../../../../domain/entities";
import { Category } from "../../models";

export const getCategories = async (
  page?: number,
  limit?: number,
  search?: string
): Promise<{ data: CategoryEntity[]; totalCount: number } | null> => {
  try {
    const validPage = page && page > 0 ? page : 1;
    const validLimit = limit && limit > 0 ? limit : 10;
    const skipNo = (validPage - 1) * validLimit;

    const query: any = {};

    // Add case-insensitive regex search on 'name'
    if (search && typeof search === 'string') {
      query.name = { $regex: new RegExp(search, 'i') }; // 'i' makes it case-insensitive
    }

    const [data, totalCount] = await Promise.all([
      Category.find(query)
        .sort({ updatedAt: 'descending' })
        .skip(skipNo)
        .limit(validLimit),
      Category.countDocuments(query),
    ]);

    console.log(data,"??????????????????????????",totalCount)

    return { data, totalCount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    return null;
  }
};
