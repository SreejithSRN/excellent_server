
import messageSentConsumer from "./consumer/messageSentConsumer";

interface ISubscriber {
	messageSent(data: any): Promise<void>;
}

export interface INotificationSubscriber extends Pick<ISubscriber, "messageSent"> {}

export const createSubscriber = (): INotificationSubscriber => {
	return {
		messageSent: messageSentConsumer,
	};
};
