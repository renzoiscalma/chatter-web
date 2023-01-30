import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { SxProps, useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { KeyboardEvent, useState } from "react";

interface NameChangeModalProps {
  opened: boolean;
  handleCloseModal(): void;
  handleChangeUsername(newUsername: string): void;
}

interface State {
  newUsername: string;
}

function NameChangeModal({
  opened,
  handleCloseModal,
  handleChangeUsername,
}: NameChangeModalProps): JSX.Element {
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

  const [values, setValues] = useState<State>({
    newUsername: "",
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && values.newUsername !== "") {
      handleChangeUsername(values.newUsername);
    }
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
          Enter New Username
        </Typography>
        <TextField
          sx={textFieldSx}
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={handleChange("newUsername")}
          onKeyDown={handleKeyDown}
        />
        <Box sx={buttonContainer}>
          <Button
            sx={confirmButtonSx}
            onClick={() => {
              handleChangeUsername(values.newUsername);
            }}
          >
            SUBMIT
          </Button>
          <Button
            sx={cancelButtonSx}
            onClick={() => {
              handleChangeUsername(values.newUsername);
            }}
          >
            CANCEL
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default NameChangeModal;
