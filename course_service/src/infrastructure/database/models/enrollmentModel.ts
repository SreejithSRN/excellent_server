import { model, Schema } from "mongoose";
import { EnrollmentEntity } from "../../../domain/entities";

const enrollmentSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrolledAt: {
    type: Schema.Types.Date,
    default: () => Date.now(),
  },
  isTestCompleted: {
    type: Boolean,
    default: false,
  },
  // mark: {
  //   type: Number,
  //   default: 0,
  //   set: (v: number) => parseFloat(v.toFixed(2)), // 👈 rounds to 2 decimal places
  // },
  mark: {
    type: [Number],
    default: [],
    set: (values: number[]) =>
      values.map((v) => parseFloat(v.toFixed(2))), // 👈 rounds each mark to 2 decimal places
  },
});

export const Enrollment = model<EnrollmentEntity>("Enrollment", enrollmentSchema);
