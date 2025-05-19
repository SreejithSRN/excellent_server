import { consumer } from "../infrastructure/kafka";
import { createSubscriber, INotificationSubscriber } from "../infrastructure/kafka/subscriber";
import dotenv from "dotenv";
dotenv.config();

const { KAFKA_TOPIC_NOTIFICATION } = process.env;

if ( !KAFKA_TOPIC_NOTIFICATION) {
  throw new Error("Missing required Kafka topic environment variables.");
}

const NOTIFICATION_TOPIC = KAFKA_TOPIC_NOTIFICATION as string;


export const startConsumer = async () => {
	try {
		await consumer.connect();
		await consumer.subscribe({
			topic: NOTIFICATION_TOPIC,
			fromBeginning: true,
		});

		const subscriber = createSubscriber();

		await consumer.run({
			eachMessage: async ({ message }) => {
				const { key, value } = message;

				const subscriberMethod = String(key) as keyof INotificationSubscriber;
				const subscriberData = JSON.parse(String(value));

				console.log("📨 Received Message Key:", subscriberMethod);
				console.log("🧩 Subscriber Methods:", Object.keys(subscriber));

				if (typeof subscriber[subscriberMethod] !== "function") {
					throw new Error(`Method ${subscriberMethod} is not a function on the subscriber object`);
				}

				try {
					await subscriber[subscriberMethod](subscriberData);
				} catch (error) {
					if (error instanceof Error) {
					  console.error("❌ Error while processing subscriber method:", error.message);
					} else {
					  console.error("❌ Unknown error occurred:", error);
					}
				  }
			},
		});
	} catch (error) {
		if (error instanceof Error) {
		  console.error("Kafka Consume Error:", error.message);
		} else {
		  console.error("Kafka Consume Unknown Error:", error);
		}
	  }
};

export const stopConsumer = async () => {
	await consumer.stop();
	await consumer.disconnect();
};
