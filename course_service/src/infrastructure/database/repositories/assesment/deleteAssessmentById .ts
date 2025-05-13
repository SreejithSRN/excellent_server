import { Assessment } from "../../models/assesmentModel";


export const deleteAssessmentById = async (
  assessmentId: string
): Promise<boolean> => {
  try {
    console.log("Inside deleteAssessmentById repository:", assessmentId);

    if (!assessmentId) {
      throw new Error("Assessment ID is required for deletion.");
    }

    const result = await Assessment.findByIdAndDelete(assessmentId);

    if (!result) {
      console.warn("Assessment not found or already deleted:", assessmentId);
      return false;
    }

    console.log("Assessment deleted successfully:", assessmentId);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while deleting assessment.");
  }
};
