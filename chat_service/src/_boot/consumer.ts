
import { consumer } from "../infrastructure/kafka"
import { createSubscriber, IPaymentSubscriber } from "../infrastructure/kafka/subscriber"
import dotenv from "dotenv";
dotenv.config();

const { KAFKA_TOPIC_CHAT } = process.env;

if ( !KAFKA_TOPIC_CHAT) {
  throw new Error("Missing required Kafka topic environment variables.");
}

const CHAT_TOPIC = KAFKA_TOPIC_CHAT as string;


export const startConsumer=async()=>{
    try {
        await consumer.connect()
        await consumer.subscribe({
            topic:CHAT_TOPIC,
            fromBeginning:true
        })
        const subscriber=createSubscriber()

        await consumer.run({
            eachMessage:async({message})=>{
                const {key, value}=message
                console.log('Received key:', String(key),JSON.parse(String(value))); 
                const subscriberMethod = String(key) as keyof IPaymentSubscriber;
                const subscriberData = JSON.parse(String(value));
                if (!subscriber[subscriberMethod] || typeof subscriber[subscriberMethod] !== 'function') {
                    console.error(`Invalid subscriber method: ${subscriberMethod}`);
                    return; 
                }
                try {
                    await subscriber[subscriberMethod](subscriberData);
                } catch (error: unknown) {
                    if (error instanceof SyntaxError) {
                        console.error("JSON Parsing Error in Kafka message:", error.message);
                    } else if (error instanceof TypeError) {
                        console.error("Type Error in Kafka Consumer:", error.message);
                    } else if (error instanceof Error) {
                        console.error("Unexpected Error in Kafka Consumer:", error.message);
                    } else {
                        console.error("Unknown error occurred in Kafka Consumer", error);
                    }
                }
            }
        })
        
    }  catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Kafka Consume Error:", error.message);
        } else {
            console.error("An unknown error occurred while starting the Kafka consumer", error);
        }
    }
}



export const stopConsumer = async () => {
    try {
        await consumer.stop();
        await consumer.disconnect();
        console.log("Kafka consumer stopped successfully.");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error stopping Kafka consumer:", error.message);
        } else {
            console.error("Unknown error while stopping Kafka consumer", error);
        }
    }
};
