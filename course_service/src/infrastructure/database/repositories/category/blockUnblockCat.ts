import { Category } from "../../models";

export const blockUnblockCat = async (id: string): Promise<boolean | null> => {
  try {
    console.log(id, "iam in repository of blkunblkcat");
    const result = await Category.findById(id);
    if (!result) {
      console.log("Category not found");
      return null;
    }
    result.isBlocked = !result.isBlocked;
    await result.save();
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
};
