import { producer } from "..";
import { CourseEntity } from "../../../domain/entities/courseEntity";

export default async (data: CourseEntity) => {
	try {
		await producer.connect();
		const message: any = [
			{
				topic: "payment-service-topic",
				messages: [
					{
						key: "courseCreated",
						value: JSON.stringify(data),
					},
				],
			},
			{
				topic: "chat-service-topic",
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