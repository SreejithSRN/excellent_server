import { CourseEntity } from "../../../domain/entities";

import mongoose from 'mongoose';
import { Chat } from "../models/chatModel";

export const createChatRoom = async (data: CourseEntity): Promise<boolean | null> => {
  try {
    console.log("///////////////////////////////////////////// ");
    console.log(" I am here in the repository to create chatroom");
    console.log("///////////////////////////////////////////// ");
    console.log(data, "I am in repository for chat Room");

    // Avoid duplicate chat room creation
    const existingRoom = await Chat.findOne({ courseRef: data._id });
    if (existingRoom) {
      console.log("Chat room already exists for this course.");
      return true;
    }

    const chatRoom = new Chat({
      courseRef: new mongoose.Types.ObjectId(data._id),
      instructorRef: new mongoose.Types.ObjectId(data.instructorRef),
      participants: [new mongoose.Types.ObjectId(data.instructorRef)], // Start with instructor
    });

    await chatRoom.save();

    console.log("Chat room created successfully.");
    return true;

  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in createChatRoom repository:", error.message);
      console.error(error.stack);
    } else {
      console.error("Unknown error in createChatRoom repository:", error);
    }
    return null;
  }
};
