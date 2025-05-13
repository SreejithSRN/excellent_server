export interface MessageEntity {
    senderId: string;
    receiverId: string;
    content: string;
    timestamp?: string; // or Date if you're handling parsing properly
}
