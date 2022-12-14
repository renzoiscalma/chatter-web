import { useContext, useEffect, useReducer, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { Divider, SxProps } from "@mui/material";
import Messages from "./Messages";
import Sender from "./Sender";
import Message from "./interface/Message";
import SendStatus from "./interface/SendStatus";
import {
  MutationTuple,
  QueryResult,
  SubscriptionResult,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import {
  GET_MESSAGES_ON_LOBBY,
  MESSAGE_ADDED_SUBSCRIPTION,
  SEND_MESSAGE,
  USERNAME_CHANGED_SUBSCRIPTION,
} from "../../queries/Chatter";
import { UsrContxt } from "../../App";
import MessageBar from "./MessageBar";
import NewMessageSubResponse from "./interface/response/NewMessageSubResponse";
import UsernameChangedSubResponse from "./interface/response/UsernameChangedSubResponse";
import { useTheme } from "@mui/material/styles";
interface LobbyIdProps {
  lobbyId: string;
}

interface UserIdProps {
  userIdProps: string;
}

type MESSAGEACTIONTYPE =
  | { type: "FETCH_ALL"; payload: any } // todo change proper types
  | { type: SendStatus.FAILED; payload: Message & { localDateSent: string } }
  | {
      type: SendStatus.SENDING;
      payload: Message & { index: number; callback: Function };
    }
  | { type: SendStatus.SENT; payload: Message & { localDateSent: string } }
  | { type: "NEW_MESSAGE"; payload: Message[] }
  | {
      type: "USERNAME_CHANGED";
      payload: { username: string; id: string };
    };

function sendMessageReducer(
  state: Message[],
  action: MESSAGEACTIONTYPE
): Message[] {
  let messages = state;
  switch (action.type) {
    case "FETCH_ALL":
      console.log(action.payload);
      return action.payload.map((message: any): Message => {
        return {
          date: new Date(+message.date),
          message: message.message,
          sender: message.from.id,
          senderUsername: message.from.username,
          to: "Lobby",
          sendStatus: SendStatus.SENT,
        };
      });
    case SendStatus.FAILED:
      return {} as Message[];
    case SendStatus.SENDING: {
      let { to, sender, message, localDateSent } = action.payload;
      messages.push(action.payload);
      action.payload.callback({
        variables: {
          addMessageInput: {
            to,
            from: sender,
            message,
            localDateSent,
          },
        },
      });
      return [...messages];
    }
    case SendStatus.SENT: {
      let { localDateSent, sender } = action.payload;
      console.log(action.payload, messages);
      let targetMessage = messages.filter(
        (message) =>
          message.localDateSent === localDateSent && message.sender === sender
      );
      targetMessage[0].sendStatus = SendStatus.SENT;
      console.log(targetMessage);
      return [...messages];
    }
    case "NEW_MESSAGE": {
      // todo sort
      return [...messages, ...action.payload];
    }
    case "USERNAME_CHANGED": {
      return messages.map((message: Message) => {
        if (message.sender === action.payload.id)
          return {
            ...message,
            senderUsername: action.payload.username,
          };
        return message;
      });
    }
    default:
      throw new Error();
  }
}

function Chatter() {
  const userContext = useContext(UsrContxt);
  const bottomDivRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  // TODO QUERY RESULT ADD PROPER TYPES
  const existingMessages: QueryResult<any, any> = useQuery(
    GET_MESSAGES_ON_LOBBY,
    { variables: { lobbyId: userContext.lobbyId } }
  );

  // unless yung state ng message is contained to itself
  const [sendMessage, sendMessageProperties] = useMutation(SEND_MESSAGE);

  const newMessageSub: SubscriptionResult<
    { messageAdded: NewMessageSubResponse },
    { lobbyId: LobbyIdProps; userId: UserIdProps }
  > = useSubscription(MESSAGE_ADDED_SUBSCRIPTION, {
    variables: {
      lobbyId: userContext.lobbyId,
      userId: userContext.userId,
    },
  });

  const usernameChangedSub: SubscriptionResult<
    {
      usernameChanged: { data: UsernameChangedSubResponse };
    },
    { lobbyId: LobbyIdProps; userId: UserIdProps }
  > = useSubscription(USERNAME_CHANGED_SUBSCRIPTION, {
    variables: {
      lobbyId: userContext.lobbyId,
      userId: userContext.userId,
    },
  });

  const chatterContainer: SxProps = {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    bgcolor: theme.chat.bgColor,
  };

  let initialMessages: Message[] = [] as Message[];
  const [messages, dispatchMessage] = useReducer(
    sendMessageReducer,
    initialMessages
  );
  const [initialized, setInitialized] = useState<boolean>(false);

  const handleSendMessage = (message: string) => {
    const messageStatusIndex: number = messages.length;

    dispatchMessage({
      type: SendStatus.SENDING,
      payload: {
        message: message,
        sender: userContext.userId,
        senderUsername: userContext.username,
        to: userContext.lobbyId,
        sendStatus: SendStatus.SENDING,
        index: messageStatusIndex,
        localDateSent: new Date().getTime() + "",
        callback: sendMessage,
      },
    });
  };

  useEffect(() => {
    bottomDivRef?.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (!initialized && existingMessages.data?.getMessagesOnLobby?.success) {
      setInitialized(true);
      dispatchMessage({
        type: "FETCH_ALL",
        payload: existingMessages.data.getMessagesOnLobby.data,
      });
    }
  }, [initialized, existingMessages.data]);

  useEffect(() => {
    if (sendMessageProperties?.data) {
      let { message, localDateSent } = sendMessageProperties.data.addMessage;
      dispatchMessage({
        type: SendStatus.SENT,
        payload: { ...message, localDateSent, sender: message.from.id },
      });
    }

    if (sendMessageProperties?.error) {
      console.log("ERROR HAS OCCURED");
    }
  }, [sendMessageProperties.data, sendMessageProperties?.error]);

  useEffect(() => {
    // todo add types
    console.log(newMessageSub.data);
    if (newMessageSub?.data?.messageAdded)
      dispatchMessage({
        type: "NEW_MESSAGE",
        payload: newMessageSub.data.messageAdded.messages.map((value: any) => ({
          ...value,
          sender: value.from.id,
          senderUsername: value.from.username,
          date: new Date(String(value.date)),
        })),
      });
  }, [newMessageSub]);

  useEffect(() => {
    console.log(usernameChangedSub);
    if (usernameChangedSub?.data?.usernameChanged) {
      dispatchMessage({
        type: "USERNAME_CHANGED",
        payload: usernameChangedSub.data.usernameChanged.data,
      });
    }
  }, [usernameChangedSub.data]);

  return (
    <Box sx={chatterContainer}>
      <MessageBar></MessageBar>
      <Messages messages={messages}>
        <div ref={bottomDivRef} />
      </Messages>
      <Divider></Divider>
      <Sender handleSendMessage={handleSendMessage}></Sender>
    </Box>
  );
}

export default Chatter;
