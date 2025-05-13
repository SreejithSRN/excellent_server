import { Schema, model, Types } from 'mongoose';

const ChatRoomSchema = new Schema(
  {
    courseRef: {
      type: Types.ObjectId,
      ref: 'Course',
      required: true,
      unique: true, // One chat room per course
    },
    instructorRef: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [
      {
        type: Types.ObjectId,
        ref: 'User',
      },
    ],
    messages: [
      {
        sender: {
          type: Types.ObjectId,
          ref: 'User',
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        replyTo: {
          type: Types.ObjectId, // refers to another message in the same array
          default: null,
        },
      },
    ]
    ,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Chat= model('Chat', ChatRoomSchema);
