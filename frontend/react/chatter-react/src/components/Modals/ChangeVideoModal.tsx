import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface ChangeVideoModalProps {
  opened: boolean;
  handleCloseModal(): void;
  handleChangeVideo(): void;
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
  return (
    <Modal open={opened} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Enter New Video Url
        </Typography>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <Button onClick={handleChangeVideo}>SUBMIT</Button>
      </Box>
    </Modal>
  );
}

export default ChangeVideoModal;
