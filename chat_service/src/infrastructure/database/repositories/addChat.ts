import { Chat } from "../models/chatModel";


export const addChat = async (data: { roomId: string; sender: string; text: string }): Promise<boolean | null> => {
  try {
    const message = {
      sender: data.sender,
      text: data.text,
      timestamp: new Date(),
    };

    const updatedRoom = await Chat.findByIdAndUpdate(
      data.roomId,
      { $push: { messages: message } },
      { new: true }
    );

    if (!updatedRoom) {
      console.log("Chat room not found for ID:", data.roomId);
      return null;
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in add chat repository:", error.message);
    } else {
      console.error("Unknown error in add chat repository:", error);
    }
    return null;
  }
};
