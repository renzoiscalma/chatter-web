import { Types } from "mongoose";
import MessageCollection from "../db/interface/MessageSchema";
import { AddMessageResponse } from "../models/AddMessageResponse";
import { pubsub } from "../redis";
import { MESSAGE_ADDED_TOPIC } from "../utils/const";

interface addMessageArgs {
	from: string,
	to: string,
	message: string,
	localDateSent: string
}

const mutationResolver = {
	Mutation: {
		// todo apply types when done https://stackoverflow.com/a/67886925/20052351
		addMessage: async (_: any, {from, to, message, localDateSent}: addMessageArgs): Promise<AddMessageResponse> => {
			console.log(from, to, message, localDateSent);
			// date is created here, once it has arrived in backend, probably add middlewares
			// TODO check if lobby and user is existing... 
			const newMessage = new MessageCollection({
				message: message,
				to: new Types.ObjectId(to),
				from: new Types.ObjectId(from),
				date: new Date(),
			});

			await newMessage.save().then(async (newMessage) => {
				await newMessage.populate([
					'from',
					{
						path: 'to',
						populate: {
							path: 'currentUsers'
						}
					}
				])
			}).catch(err => { // todo have a proper middleware for catching errrors
				console.error(err);
				return undefined;
			});
			
			await pubsub.publish(MESSAGE_ADDED_TOPIC, {
				messageAdded: {
					lobbyId: newMessage.get('to')?._id,
					messages: [newMessage].map((newMessage) => newMessage.toJSON({virtuals: true})) // TODO replace newMessage in the future
				}
			});
			
			return (newMessage) 
				? {
					code: 200,
					success: true,
					message: newMessage,
					localDateSent
				} 
				: {
					code: 404,
					success: false,
					message: newMessage,
					localDateSent
				};
		}
		
	}
};

export default mutationResolver;