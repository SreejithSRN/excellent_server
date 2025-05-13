import { Kafka, Partitioners, Producer } from "kafkajs";

const kafka=new Kafka({
    clientId:"auth-service",
    brokers:["localhost:29092"]
})
export const producer:Producer=kafka.producer({createPartitioner:Partitioners.LegacyPartitioner})