import { ChatRoomEntity, ChatMessage } from "../../../domain/entities";
import { Types } from "mongoose";
import { Chat } from "../models/chatModel";

export const getRooms = async (userId: string): Promise<ChatRoomEntity[] | null> => {
  try {
    const rooms = await Chat.find({
      participants: new Types.ObjectId(userId),
      isActive: true,
    })
      .populate('courseRef', 'title') // Populate course title
      .populate('participants', 'name') // ✅ Populate participant names
      .populate({
        path: 'messages.sender',
        select: 'name', // Populate message sender name
      })
      .sort({ updatedAt: -1 })
      .lean();

    const mappedRooms: ChatRoomEntity[] = rooms.map((room: any) => ({
      _id: room._id?.toString(),
      courseRef: room.courseRef?._id?.toString() ?? "",
      instructorRef: room.instructorRef?.toString(),
      name: room.courseRef?.title ?? "",
      participants: room.participants.map((p: any) => ({
        _id: p._id?.toString(),
        name: p.name || "",
      })), // ✅ Return participant id and name
      messages: room.messages.map((msg: any) => {
        const sender = msg.sender || {};
        return {
          sender: sender._id?.toString?.() || msg.sender?.toString?.() || "",
          name: sender.name || "",
          text: msg.text,
          timestamp: msg.timestamp,
          replyTo: msg.replyTo?.toString() || null,
        } as ChatMessage;
      }),
      isActive: room.isActive,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
    }));

    

    return mappedRooms;
  } catch (error) {
    console.error("Error in getRooms repository:", error);
    return null;
  }
};
