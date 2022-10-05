import { useContext, useEffect, useReducer, useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, SxProps } from '@mui/material';
import Messages from './Messages';
import Sender from './Sender';
import Message from './interface/Message';
import SendStatus from './interface/SendStatus';
import samepleData from './sampledata';
import { QueryResult, useMutation, useQuery } from '@apollo/client';
import { GET_MESSAGES_ON_LOBBY, SEND_MESSAGE } from '../Queries/Chatter';
import { UserContext } from '../Layout/Layout';

interface ChatterProps {
	messages: Message[];
}

type MESSAGEACTIONTYPE = 
	| {type: "FETCH_ALL", payload: any } // todo change proper types
	| {type: SendStatus.FAILED, payload: Message & {index: number} }
	| {type: SendStatus.SENDING, payload: Message & {index: number, callback: Function} }
	| {type: SendStatus.SENT, payload: Message & {index: number} }

function sendMessageReducer(state: Message[], action: MESSAGEACTIONTYPE): Message[] {
	let messages = state;
	switch(action.type) {
		case "FETCH_ALL":
			return action.payload.map((message: any): Message => {
				return {
					date: new Date(+message.date),
					message: message.message,
					sender: message.from.id,
					to: "Lobby",
					sendStatus: SendStatus.SENT
				}
			})
		case SendStatus.FAILED:
			return {} as Message[];
		case SendStatus.SENDING:
			messages.push(action.payload);
			action.payload.callback({
				variables: {
					to: action.payload.to,
					from: action.payload.sender,
					message: action.payload.message
				}
			});
			return [...messages]
		case SendStatus.SENT:
			messages[action.payload.index].sendStatus = SendStatus.SENT;
			return [...messages]
		default:
			throw new Error();
	}
}

function Chatter() {
	const userContext = useContext(UserContext);

	// TODO QUERY RESULT ADD PROPER TYPES
	const { loading, error, data }: QueryResult<any, any> = useQuery(GET_MESSAGES_ON_LOBBY, {
		variables: {
			lobbyId: userContext.lobbyId
		}
	});

	const [sendMessage, sendMessageProperties] = useMutation(SEND_MESSAGE);

	const chatterContainer: SxProps = {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	}

	let initialMessages: Message[] = [] as Message[];
	const [messages, dispatchMessage] = useReducer(sendMessageReducer, initialMessages);
	const [initialized, setInitialized] = useState<boolean>(false);

	const handleSendMessage = (message: string) => {
		const messageStatusIndex: number = messages.length;

		dispatchMessage({ type: SendStatus.SENDING, payload: {
				message: message,
				sender: userContext.userId,
				to: userContext.lobbyId,
				sendStatus: SendStatus.SENDING,
				index: messageStatusIndex,
				callback: sendMessage
			} 
		});
	}

	useEffect(() => {
		if (!initialized && data?.getMessagesOnLobby?.success) {
			setInitialized(true);
			dispatchMessage({type: "FETCH_ALL", payload: data.getMessagesOnLobby.data});
		}
	}, [initialized, data]);

	useEffect(() => {
		console.log(sendMessageProperties);
	}, [sendMessageProperties])

	return (
		<Box sx={chatterContainer}>
			<Messages messages={messages}></Messages>
			<Divider></Divider>
			<Sender handleSendMessage={handleSendMessage}></Sender>
		</Box>
	);
}

export default Chatter;