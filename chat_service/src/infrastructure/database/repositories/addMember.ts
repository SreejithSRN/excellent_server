import { Types } from 'mongoose';
import { Chat } from '../models/chatModel';

export const addMember = async (
  studentId: string,
  courseId: string
): Promise<boolean | null> => {
  try {
    console.log(studentId, courseId, 'I am in the repo of chat add member');

    // Find the chat room for the course
    const room = await Chat.findOne({ courseRef: courseId });

    if (!room) {
      console.error('Chat room not found for course:', courseId);
      return null;
    }

    // Convert to ObjectId for comparison
    const studentObjectId = new Types.ObjectId(studentId);

    // Safe check using string comparison
    const isAlreadyMember = room.participants
      .map((p) => p.toString())
      .includes(studentObjectId.toString());

    if (isAlreadyMember) {
      console.log('Student is already a participant');
      return true;
    }

    // Add student to participants
    room.participants.push(studentObjectId);
    await room.save();

    console.log('Student added to chat room');
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error in add member repository:', error.message);
    } else {
      console.error('Unknown error in add member repository:', error);
    }
    return null;
  }
};
