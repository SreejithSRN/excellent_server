import { AssessmentEntity, Question, OptionLabel } from "../../../../domain/entities/assesmentEntity";
import { Assessment } from "../../models/assesmentModel";

export const createAssessment = async (
  data: AssessmentEntity
): Promise<AssessmentEntity> => {
  try {
    console.log("Inside createAssessment repository");

    if (!data.courseRef || !data.questions || !Array.isArray(data.questions)) {
      throw new Error("Course ID and valid questions are required.");
    }

    const existingAssessment = await Assessment.findOne({ courseRef: data.courseRef });

    const transformedQuestions: Question[] = data.questions.map((q): Question => ({
      questionText: q.questionText,
      answerKey: q.answerKey as OptionLabel,
      options: q.options.map(opt => ({
        label: opt.label as OptionLabel,
        value: opt.value,
      })),
    }));

    let savedAssessment;

    if (existingAssessment) {
      existingAssessment.set("questions", transformedQuestions); // ✅ use `.set()` to avoid DocumentArray issue
      savedAssessment = await existingAssessment.save();
      console.log("Assessment updated for course:", data.courseRef);
    } else {
      savedAssessment = await new Assessment({
        courseRef: data.courseRef,
        questions: transformedQuestions,
      }).save();
      console.log("New assessment created for course:", data.courseRef);
    }

    return {
      _id: savedAssessment._id,
      courseRef: savedAssessment.courseRef,
      questions: savedAssessment.questions.map((q): Question => ({
        questionText: q.questionText,
        answerKey: q.answerKey as OptionLabel,
        options: q.options.map(opt => ({
          label: opt.label as OptionLabel,
          value: opt.value,
        })),
      })),
      createdAt: savedAssessment.createdAt,
      updatedAt: savedAssessment.updatedAt,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while saving assessment");
  }
};
