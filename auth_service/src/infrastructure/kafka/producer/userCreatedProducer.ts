import { producer } from "..";
import { UserEntity } from "../../../domain/entities";
import dotenv from "dotenv";
dotenv.config();
// Validate env vars at the top
const { KAFKA_TOPIC_COURSE, KAFKA_TOPIC_PAYMENT, KAFKA_TOPIC_CHAT } =
  process.env;

if (!KAFKA_TOPIC_COURSE || !KAFKA_TOPIC_PAYMENT || !KAFKA_TOPIC_CHAT) {
  throw new Error("Missing required Kafka topic environment variables.");
}
const COURSE_TOPIC = KAFKA_TOPIC_COURSE as string;
const PAYMENT_TOPIC = KAFKA_TOPIC_PAYMENT as string;
const CHAT_TOPIC = KAFKA_TOPIC_CHAT as string;

export default async (data: UserEntity | null) => {
  try {
    await producer.connect();

    const message = [
      {
        topic: COURSE_TOPIC,
        messages: [
          {
            key: "userCreated",
            value: JSON.stringify(data),
          },
        ],
      },
      {
        topic: PAYMENT_TOPIC,
        messages: [
          {
            key: "userCreated",
            value: JSON.stringify(data),
          },
        ],
      },
      {
        topic: CHAT_TOPIC,
        messages: [
          {
            key: "userCreated",
            value: JSON.stringify(data),
          },
        ],
      },
    ];

    await producer.sendBatch({ topicMessages: message });

    console.log("Message sent successfully to Kafka topic.");
  } catch (error: unknown) {
    console.error(
      "Kafka produce error in auth_service:",
      (error as Error)?.message
    );
  } finally {
    await producer.disconnect();
  }
};
