import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface NameChangeModalProps {
  opened: boolean;
  handleCloseModal(): void;
  handleChangeUsername(): void;
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
  return (
    <Modal open={opened} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter New Username
        </Typography>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button onClick={handleChangeUsername}>SUBMIT</Button>
      </Box>
    </Modal>
  );
}

export default NameChangeModal;
