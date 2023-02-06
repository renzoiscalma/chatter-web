import { Box, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { SxProps, useTheme } from "@mui/material/styles";

interface ShareLobbyModalProps {
  lobbyId: string;
  opened: boolean;
  handleCloseModal(): void;
}
const ShareLobbyModal = ({
  lobbyId,
  opened,
  handleCloseModal,
}: ShareLobbyModalProps): JSX.Element => {
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
    boxShadow: 24,
    px: 4,
    py: 2,
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

  return (
    <>
      <Modal open={opened} onClose={handleCloseModal}>
        <Box sx={style}>
          <TextField
            autoComplete="off"
            sx={textFieldSx}
            id="outlined-basic"
            label={"LOBBY URL"}
            variant="outlined"
            aria-readonly
            defaultValue={lobbyId}
            placeholder="https://www.youtube.com/watch?v=4WXs3sKu41I"
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      </Modal>
    </>
  );
};
