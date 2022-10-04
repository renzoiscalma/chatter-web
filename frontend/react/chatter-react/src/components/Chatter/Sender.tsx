import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, { KeyboardEvent, useContext } from "react";
import { Send } from "@mui/icons-material";
import SendStatus from "./interface/SendStatus";
import Message from "./interface/Message";
import { UserContext } from "../Layout/Layout";

interface SenderProps {
	handleSendMessage(message: Message): void;
}

function Sender({handleSendMessage}: SenderProps): JSX.Element {
	const textFieldStyle = {
		width: '95%',
		margin: '10px'
	}

	const sendContainerStyle = {
	}

	interface State {
		message: string;
	}

	const userContext = useContext(UserContext);
	const [values, setValues] = React.useState<State>({
		message: ''
	});

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
		if (event.key === "Enter") {
			handleSendMessage(generateMessage());
			setValues({message: ''});
		}
	}

	const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({[prop]: event.target.value});
	}

	const generateMessage = (): Message => ({
		message: values.message,
		sender: userContext.username, // TODO be changed
		to: "World", // TODO change
		date: new Date(),
		sendStatus: SendStatus.SENDING,
	});

	const sendButton = (
		<InputAdornment position="end">
			<IconButton
				aria-label="send message"
				onClick={() => {
					handleSendMessage(generateMessage());
					setValues({message: ''});
				}}
				edge="end"
			>
				<Send />
			</IconButton>
		</InputAdornment>
	)

	return (
		<Box sx={sendContainerStyle}>
			<OutlinedInput value={values.message} onChange={handleChange('message')} onKeyDown={handleKeyDown} id="outlined-basic" size="small" sx={textFieldStyle} endAdornment={sendButton}/>
		</Box>
	)
}

export default Sender;