import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

interface LobbyModalProps {
  opened: boolean;
  handleCloseModal(): void;
  createLobby(): void;
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

const LobbyModal = ({
  opened,
  createLobby,
  handleCloseModal,
}: LobbyModalProps) => {
  return (
    <Modal open={opened} onClose={handleCloseModal}>
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Create your lobby for you and your friend!
        </Typography>
        <Button onClick={createLobby}>Create Lobby!</Button>
      </Box>
    </Modal>
  );
};

export default LobbyModal;
