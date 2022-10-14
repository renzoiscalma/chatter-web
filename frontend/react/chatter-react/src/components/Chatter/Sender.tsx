import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import React, { KeyboardEvent, useContext } from "react";
import { Send } from "@mui/icons-material";
import SendStatus from "./interface/SendStatus";
import Message from "./interface/Message";
import { UsrContxt } from "../../App";

interface SenderProps {
  handleSendMessage(message: string): void;
}

function Sender({ handleSendMessage }: SenderProps): JSX.Element {
  const textFieldStyle = {
    width: "95%",
    margin: "10px",
  };

  const sendContainerStyle = {};

  interface State {
    message: string;
  }

  const userContext = useContext(UsrContxt);
  const [values, setValues] = React.useState<State>({
    message: "",
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleSendMessage(values.message);
      setValues({ message: "" });
    }
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ [prop]: event.target.value });
    };

  const sendButton = (
    <InputAdornment position="end">
      <IconButton
        aria-label="send message"
        onClick={() => {
          handleSendMessage(values.message);
          setValues({ message: "" });
        }}
        edge="end"
      >
        <Send />
      </IconButton>
    </InputAdornment>
  );

  return (
    <Box sx={sendContainerStyle}>
      <OutlinedInput
        value={values.message}
        onChange={handleChange("message")}
        onKeyDown={handleKeyDown}
        id="outlined-basic"
        size="small"
        sx={textFieldStyle}
        endAdornment={sendButton}
      />
    </Box>
  );
}

export default Sender;
