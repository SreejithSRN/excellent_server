import mongoose, { Schema, Document } from "mongoose";

// Enums for consistency
enum Language {
  English = "english",
  Hindi = "hindi",
  Malayalam = "malayalam",
}

enum Level {
  Beginner = "beginner",
  Intermediate = "intermediate",
  Advanced = "expert",
}

enum PricingType {
  Free = "free",
  Paid = "paid",
}

// Pricing Schema
const PricingSchema = new Schema({
  amount: { type: Number, default: 0 },
  type: { type: String, enum: Object.values(PricingType), required: true },
});

// Lesson Schema
const LessonSchema = new Schema({
  lessonNumber: {
        type: Number,
        required: true
    },
  title: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String, required: true }, 
  duration: { type: String, required: true }, 
});

// Course Schema
const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    categoryRef: { type: mongoose.Schema.Types.ObjectId, ref: "categories", required: true },
    instructorRef: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    language: { type: String, enum: Object.values(Language), required: true },
    level: { type: String, enum: Object.values(Level), required: true },
    pricing: { type: PricingSchema, required: true },
    thumbnail: { type: String, required: true }, 
    lessons: [LessonSchema],
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", CourseSchema);
