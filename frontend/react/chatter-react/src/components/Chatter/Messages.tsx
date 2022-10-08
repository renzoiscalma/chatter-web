import { Box, Paper, SxProps } from "@mui/material";
import Message from "./interface/Message";
import { useContext, useEffect, useRef } from "react";
import SendStatus from "./interface/SendStatus";
import CheckIcon from '@mui/icons-material/Check';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PriorityHigh from '@mui/icons-material/PriorityHigh';
import { UserContext } from "../Layout/Layout";

interface MessageProps {
	messages: Message[];
}

function Messages({ messages }: MessageProps): JSX.Element {

	const messagesContainer: SxProps = {
		display: 'flex',
		flexDirection: 'column',
		overflowY: 'scroll',
		height: '100%',
	}

	const messageBubbleStyle: SxProps = {
		textAlign: "initial",
		borderRadius: "1.15rem",
		lineHeight: 1.25,
		maxWidth: "75%",
		padding: "0.5rem .875rem",
		position: "relative",
		wordWrap: "break-word",
		marginTop: "2.5px",
		marginBottom: "2.5px",
		display: "inline-flex",
		wordBreak: "break-word",
	}

	const commonTailStyle: SxProps = {
		bottom: "-0.1rem",
		content: "''",
		height: "1rem",
		position: "absolute",

	}

	const tailSelfStyle: SxProps = {
		"&::after": {
			...commonTailStyle,
			backgroundColor: '#fff',
			borderBottomLeftRadius: "0.5rem",
			right: "-40px",
			transform:"translate(-30px, -2px)",
			width: "10px",
		},
		"&::before": {
			...commonTailStyle,
			borderBottomLeftRadius: "0.8rem 0.7rem",
			borderRight: "1rem solid #248bf5",
			right: "-0.35rem",
			transform: "translate(0, -0.1rem)",
		}
	}

	const tailOtherStyle: SxProps = {
		"&::after": {
			...commonTailStyle,
			backgroundColor: '#fff',
			borderBottomRightRadius: "0.5rem",
			left: "20px",
			transform:"translate(-30px, -2px)",
			width: "10px",
		},
		"&::before": {
			...commonTailStyle,
			borderBottomRightRadius: "0.8rem 0.7rem",
			borderLeft: "1rem solid #e5e5ea",
			left: "-0.35rem",
			transform: "translate(0, -0.1rem)",
		}
	}
 
	const iconStyle: SxProps = {
		width: '12px',
		height: '12px',
		alignSelf: "flex-end",
		marginLeft: '8px'
	}

	const rotateIcon: SxProps = {
		animation: "spin 2s linear infinite",
		"@keyframes spin": {
			"0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      }
		}
	}
	
	const divRef = useRef<HTMLDivElement>(null);
	const userContext = useContext(UserContext);

	useEffect(() => {
		divRef.current?.scrollIntoView({behavior: "auto"});
		console.log(userContext);
	}, [messages])

	const getMessageBubbleStyle = (message: Message, index: number, messages: Message[]): SxProps => {
		const nextMessage = (messages[index + 1]) ? messages[index + 1] : null;
		const tail: boolean = (!nextMessage || nextMessage.sender !== message.sender) ? true : false;
		let tailStyle: SxProps = {} as SxProps;
		if (tail)
			tailStyle = (message.sender === userContext.userId) ?  tailSelfStyle : tailOtherStyle;
		return {
			...messageBubbleStyle,
			...tailStyle,
			backgroundColor: message.sender !== userContext.userId ?  "#e5e5ea" : "#248bf5",
			color: message.sender !== userContext.userId ? "#000" : "#fff",
			alignSelf: message.sender !== userContext.userId ? "flex-start" : "flex-end",
			marginLeft: message.sender !== userContext.userId ? "16px" : "0px",
			marginRight: message.sender !== userContext.userId ? "0px" : "16px",
		};
	};

	const generateMessageStatus = (message: Message): JSX.Element | null => {
		if (message.sender !== userContext.userId) return null;
		if (message.sendStatus === SendStatus.FAILED) {
			return <PriorityHigh sx={iconStyle}></PriorityHigh>
		} else if (message.sendStatus === SendStatus.SENDING) {
			return <AutorenewIcon sx={{...iconStyle, ...rotateIcon}}></AutorenewIcon>
		} else {
			return <CheckIcon sx={iconStyle}></CheckIcon>
		}
	}
	
	return (
		<Box sx={messagesContainer}>
			{	
				(messages) 
					? messages.map((value: Message, index: number, messages: Message[]) => (
							<Paper sx={getMessageBubbleStyle(value, index, messages)} key={value.date+"-"+ index}> 
								{value.message} {generateMessageStatus(value)} 
							</Paper>
						))
					: <></>
			}
			<div ref={divRef} />
		</Box>
	)
}

export default Messages;