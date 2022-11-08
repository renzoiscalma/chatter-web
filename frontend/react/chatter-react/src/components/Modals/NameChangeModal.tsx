import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
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

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function NameChangeModal({
  opened,
  handleCloseModal,
  handleChangeUsername,
}: NameChangeModalProps): JSX.Element {
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter New Username
        </Typography>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleChange("newUsername")}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={() => {
            handleChangeUsername(values.newUsername);
          }}
        >
          SUBMIT
        </Button>
      </Box>
    </Modal>
  );
}

export default NameChangeModal;
