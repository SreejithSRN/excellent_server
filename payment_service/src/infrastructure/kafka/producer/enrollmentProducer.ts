import { producer } from "..";
import dotenv from "dotenv";
dotenv.config();
const { KAFKA_TOPIC_COURSE} = process.env;

if (!KAFKA_TOPIC_COURSE) {
  throw new Error("Missing required Kafka topic environment variables.");
}
const COURSE_TOPIC = KAFKA_TOPIC_COURSE as string;

export default async (data:{studentId:string,courseId:string}) => {
	try {
		await producer.connect();
		const message: any = [
			{
				topic: COURSE_TOPIC,
				messages: [
					{
						key: "enrollmentCreated",
						value: JSON.stringify(data),
					},
				],
			}
		]

		
		await producer.sendBatch({topicMessages: message});

		console.log(message, "enrollmentcreated produced--->");

	} catch (error: unknown) {
        console.error("Kafka produce error in Payment_service:", (error as Error)?.message);
    }finally {
		await producer.disconnect();
	}
};