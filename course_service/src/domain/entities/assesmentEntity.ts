import { Types } from "mongoose";

export interface AssessmentEntity {
  id?: string;
  _id?: string | Types.ObjectId;
  courseRef?: string | Types.ObjectId;
  questions?: Question[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Question {
  questionText: string;
  options: Option[];
  answerKey: OptionLabel; // "A" | "B" | "C" | "D"
}

export interface Option {
  label: OptionLabel; // A, B, C, D
  value: string;
}

export type OptionLabel = "A" | "B" | "C" | "D";


export interface AssessmentView  {
  courseTitle?: string;
  instructorName?: string;
  lessonsCount?: number;
  status?:boolean
  mark?: number[] ;
  certificateUrl?: string;
  studentName?: string;
  studentEmail?:string
};

