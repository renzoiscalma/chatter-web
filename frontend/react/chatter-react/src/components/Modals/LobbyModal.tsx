import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SxProps, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { KeyboardEvent, useState } from "react";

interface LobbyModalProps {
  opened: boolean;
  handleCloseModal(): void;
  createLobby(videoUrl: string): void;
}
interface InputState {
  input: string;
}

const LobbyModal = ({
  opened,
  createLobby,
  handleCloseModal,
}: LobbyModalProps) => {
  const theme = useTheme();

  const style: SxProps = {
    display: "flex",
    flexDirection: "column",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "26px",
    width: 400,
    bgcolor: theme.modal?.bgColor,
    px: 4,
    py: 2,
    "&:focus": {
      outline: "none",
    },
  };

  const textFieldSx: SxProps = {
    margin: "18px 0",
    ".MuiInputLabel-outlined": {
      color: theme.common.text.secondary + " !important",
    },
    input: {
      color: theme.common.text.secondary,
    },
    fieldset: {
      borderColor: theme.textInput?.borderColor,
      "&.MuiOutlinedInput-notchedOutline": {
        borderColor: theme.textInput?.borderColor + " !important",
      },
    },
  };

  const [values, setValues] = useState<InputState>({
    input: "https://www.youtube.com/watch?v=4WXs3sKu41I",
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && values.input !== "") {
      createLobby(values.input);
    }
  };

  const handleChange =
    (prop: keyof InputState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ [prop]: event.target.value });
    };

  return (
    <Modal open={opened} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          color={theme.common.text.secondary}
        >
          Create your lobby for you and your friends!
        </Typography>
        <TextField
          autoComplete="off"
          sx={textFieldSx}
          id="outlined-basic"
          label="Video Url"
          variant="outlined"
          onChange={handleChange("input")}
          onKeyDown={handleKeyDown}
          defaultValue="https://www.youtube.com/watch?v=4WXs3sKu41I"
          placeholder="https://www.youtube.com/watch?v=4WXs3sKu41I"
        />
        <Button onClick={() => createLobby(values.input)}>Create Lobby!</Button>
      </Box>
    </Modal>
  );
};

export default LobbyModal;
