import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { KeyboardEvent, useState } from "react";

interface ChangeVideoModalProps {
  opened: boolean;
  handleCloseModal(): void;
  handleChangeVideo(newUrl: string): void;
}

interface State {
  newUrl: string;
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

function ChangeVideoModal({
  opened,
  handleCloseModal,
  handleChangeVideo,
}: ChangeVideoModalProps): JSX.Element {
  const [values, setValues] = useState<State>({
    newUrl: "",
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter" && values.newUrl !== "") {
      handleChangeVideo(values.newUrl);
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
          Enter New Video Url
        </Typography>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          onChange={handleChange("newUrl")}
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={() => {
            handleChangeVideo(values.newUrl);
          }}
        >
          SUBMIT
        </Button>
      </Box>
    </Modal>
  );
}

export default ChangeVideoModal;
