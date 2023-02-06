import CopyAllIcon from "@mui/icons-material/CopyAll";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { SxProps, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

interface ShareLobbyModalProps {
  lobbyUrl: string;
  opened: boolean;
  handleCloseModal(): void;
}
const ShareLobbyModal = ({
  lobbyUrl,
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
    marginBottom: "24px",
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
  const inputLabelSx: SxProps = {
    color: theme.common.text.secondary,
    "&.Mui-focused": {
      color: theme.common.text.secondary,
    },
  };
  const copyIconSx: SxProps = {
    color: theme.common.text.secondary,
  };
  const headerStyle: SxProps = {
    marginBottom: "24px",
  };

  const handleCopyAllClick = (): void => {
    navigator.clipboard.writeText(lobbyUrl);
  };

  return (
    <>
      <Modal open={opened} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            textAlign="center"
            color={theme.common.text.secondary}
            sx={headerStyle}
          >
            Share this URL to your friends!
          </Typography>
          <FormControl variant="outlined">
            <InputLabel htmlFor="copy-url" sx={inputLabelSx}>
              Copy Url
            </InputLabel>
            <OutlinedInput
              autoComplete="off"
              id="copy-url"
              sx={textFieldSx}
              type="text"
              aria-readonly
              defaultValue={lobbyUrl}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleCopyAllClick}>
                    <CopyAllIcon sx={copyIconSx} />
                  </IconButton>
                </InputAdornment>
              }
              label="Copy Url"
              readOnly
            />
          </FormControl>
        </Box>
      </Modal>
    </>
  );
};

export default ShareLobbyModal;
