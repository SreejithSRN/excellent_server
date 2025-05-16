import { producer } from "..";
import { MessageEntity } from "../../../domain/entities"; 
import dotenv from "dotenv";
dotenv.config();

const { KAFKA_TOPIC_NOTIFICATION } =
  process.env;
  if (!KAFKA_TOPIC_NOTIFICATION ) {
  throw new Error("Missing required Kafka topic environment variables.");
}
const NOTIFICATION_TOPIC = KAFKA_TOPIC_NOTIFICATION as string;

export default async (messageData: MessageEntity | null) => {
    if (!messageData) return;

    try {
        await producer.connect();

        const message = [
            {
                topic: NOTIFICATION_TOPIC,
                messages: [
                    {
                        key: "messageSent",
                        value: JSON.stringify(messageData),
                    },
                ],
            },
        ];

        await producer.sendBatch({ topicMessages: message });

        console.log("Message sent successfully to notification-service Kafka topic.");
    } catch (error: unknown) {
        console.error("Kafka produce error in auth_service (messageServiceProducer):", (error as Error)?.message);
    } finally {
        await producer.disconnect();
    }
};
