import { producer } from "..";

export default async (data:{studentId:string,courseId:string}) => {
	try {
		await producer.connect();
		const message: any = [
			{
				topic: "course-service-topic",
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