import mongoose, { Schema, Document } from "mongoose";

// Option Sub-Schema
const OptionSchema = new Schema(
  {
    label: { type: String, required: true }, // A, B, C, D
    value: { type: String, required: true },
  },
  { _id: false }
);

// Question Sub-Schema
const QuestionSchema = new Schema(
  {
    questionText: { type: String, required: true },
    options: { type: [OptionSchema], required: true },
    answerKey: { type: String, required: true }, // One of: A, B, C, D
  },
  { _id: false }
);

// Assessment Main Schema
const AssessmentSchema = new Schema(
  {
    courseRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    questions: {
      type: [QuestionSchema],
      required: true,
    },
  },
  { timestamps: true }
);

// Export model
export const Assessment = mongoose.model("Assessment", AssessmentSchema);
