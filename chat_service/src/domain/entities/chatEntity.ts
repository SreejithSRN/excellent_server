import { Types } from 'mongoose';

export interface ChatMessage {
  sender: Types.ObjectId | string;
  name?:string
  text: string;
  timestamp?: Date;
  replyTo?: Types.ObjectId | string | null; // added to support replies
}



export interface ChatParticipant {
  _id: Types.ObjectId | string;
  name?: string;
}

export interface ChatRoomEntity {
  _id?: Types.ObjectId | string;
  name?:string
  courseRef: Types.ObjectId | string;
  instructorRef: Types.ObjectId | string;
  participants: ChatParticipant[];
  messages: ChatMessage[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
