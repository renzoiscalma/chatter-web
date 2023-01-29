import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  SxProps,
} from "@mui/material";
import React, { KeyboardEvent, useContext } from "react";
import { Send } from "@mui/icons-material";
import { UsrContxt } from "../../App";
import { useTheme } from "@mui/material/styles";

interface SenderProps {
  handleSendMessage(message: string): void;
}

function Sender({ handleSendMessage }: SenderProps): JSX.Element {
  const theme = useTheme();
  const textFieldStyle = {
    width: "95%",
    margin: "10px",
    color: theme.common.text.secondary,
    fieldset: {
      borderColor: theme.common.text.secondary,
    },
  };

  const iconSx: SxProps = {
    color: theme.chat.bubbleTo,
    "&.Mui-disabled": {
      color: theme.chat.bubbleTo,
      opacity: "60%",
    },
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
    if (event.key === "Enter" && values.message !== "") {
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
        disabled={values.message === ""}
        aria-label="send message"
        onClick={() => {
          handleSendMessage(values.message);
          setValues({ message: "" });
        }}
        edge="end"
        sx={iconSx}
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
