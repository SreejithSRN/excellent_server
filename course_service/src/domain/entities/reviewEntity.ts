import { Types } from "mongoose";

export interface ReviewEntity {
  courseRef: Types.ObjectId;
  userRef: Types.ObjectId;
  rating: number;
  reviewText: string;
  reactions: {
    like: Types.ObjectId[];
    dislike: Types.ObjectId[];
  };
  comments: {
    userRef?: Types.ObjectId;
    commentText?: string;
    createdAt?: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewRate{
  courseRef: Types.ObjectId;
  userRef: Types.ObjectId;
  rating: number;
  reviewText: string;
}

export interface ReviewRateResponse {
  success: boolean;
  message: string;
  review?: ReviewEntity
}

