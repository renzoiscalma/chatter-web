import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SxProps, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { KeyboardEvent, useState } from "react";

interface ModalProps {
  opened: boolean;
  handleCloseModal(): void;
  handleSubmit(input: string): void;
  header: string;
  placeholder: string;
}

interface InputState {
  input: string;
}

// A generic modal that contains a SINGLE text input, a confirm and a cancel button.
function SimpleModal({
  opened,
  handleCloseModal,
  handleSubmit,
  header,
  placeholder,
}: ModalProps): JSX.Element {
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
    bgcolor: theme.appBar.bgColor,
    boxShadow: 24,
    px: 4,
    py: 2,
  };

  const confirmButtonSx: SxProps = {
    flexGrow: 1,
  };

  const cancelButtonSx: SxProps = {
    flexGrow: 1,
  };

  const buttonContainer: SxProps = {
    display: "flex",
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
      borderColor: theme.common.text.secondary,
    },
  };

  const [values, setValues] = useState<InputState>({
    input: "",
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && values.input !== "") {
      handleSubmit(values.input);
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
          textAlign="center"
          color={theme.common.text.secondary}
        >
          {header}
        </Typography>
        <TextField
          sx={textFieldSx}
          id="outlined-basic"
          label={placeholder}
          variant="outlined"
          onChange={handleChange("input")}
          onKeyDown={handleKeyDown}
        />
        <Box sx={buttonContainer}>
          <Button
            sx={confirmButtonSx}
            onClick={() => {
              handleSubmit(values.input);
            }}
          >
            SUBMIT
          </Button>
          <Button sx={cancelButtonSx} onClick={handleCloseModal}>
            CANCEL
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SimpleModal;
