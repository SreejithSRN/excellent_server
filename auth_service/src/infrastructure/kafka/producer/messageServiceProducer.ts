import { producer } from "..";
import { MessageEntity } from "../../../domain/entities"; // Define this entity if not already

export default async (messageData: MessageEntity | null) => {
    if (!messageData) return;

    try {
        await producer.connect();

        const message = [
            {
                topic: "notification-service-topic",
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
