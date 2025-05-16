import { producer } from "..";
import { CourseEntity } from "../../../domain/entities/courseEntity";
import dotenv from "dotenv";
dotenv.config();

const { KAFKA_TOPIC_PAYMENT, KAFKA_TOPIC_CHAT } = process.env;

if ( !KAFKA_TOPIC_PAYMENT || !KAFKA_TOPIC_CHAT) {
  throw new Error("Missing required Kafka topic environment variables.");
}

const PAYMENT_TOPIC = KAFKA_TOPIC_PAYMENT as string;
const CHAT_TOPIC = KAFKA_TOPIC_CHAT as string;


export default async (data: CourseEntity) => {
	try {
		await producer.connect();
		const message: any = [
			{
				topic: PAYMENT_TOPIC,
				messages: [
					{
						key: "courseCreated",
						value: JSON.stringify(data),
					},
				],
			},
			{
				topic: CHAT_TOPIC,
				messages: [
					{
						key: "courseCreated",
						value: JSON.stringify(data),
					},
				],
			}
		]

		
		await producer.sendBatch({topicMessages: message});

		console.log(message, "course created produced--->");

	} catch (error: unknown) {
        console.error("Kafka produce error in course_service:", (error as Error)?.message);
    }finally {
		await producer.disconnect();
	}
};