import { Assessment } from "../../models/assesmentModel";

export const getTestAssessment = async (courseId: string) => {
  try {
    console.log(courseId, "👉 in getTestAssessment repo... waiting to match courseId");

    if (!courseId) {
      throw new Error("Course ID is required");
    }

    const assessment = await Assessment.findOne({ courseRef: courseId }).lean();

    
    if (!assessment) {
      throw new Error("No assessment found for this course");
    }
    
    
    const questionsWithoutAnswers = assessment.questions.map((question: any) => {
      const { answerKey, ...rest } = question;
      return rest;
    });
    
  
    
    return {
      ...assessment,
      questions: questionsWithoutAnswers,
    };

  } catch (err) {
    console.error("❌ Error in getTestAssessment:", err);
    throw err;
  }
};
