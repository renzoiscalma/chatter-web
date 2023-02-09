import { Check } from "@mui/icons-material";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import { SxProps, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useRef, useState } from "react";

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
  const [copiedLobbyUrl, setCopiedLobbyUrl] = useState<boolean>(false);
  const inputFieldRef = useRef(null);

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
      "&:hover": {
        cursor: "pointer",
      },
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
    marginBottom: "36px",
  };

  const handleCopyAllClick = (event: SyntheticEvent): void => {
    navigator.clipboard.writeText(lobbyUrl);
    // highlight text
    (event.target as HTMLTextAreaElement).select();
    setCopiedLobbyUrl(true);

    setTimeout(() => {
      setCopiedLobbyUrl(false);
    }, 3000);
  };

  const checkIconSx: SxProps = {
    color: theme.common.text.secondary,
  };

  const tooltipTitle = (): string =>
    copiedLobbyUrl ? "Copied!" : "Click to copy url";

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
          <Tooltip title={tooltipTitle()} placement="top">
            <FormControl variant="outlined">
              <InputLabel htmlFor="copy-url" sx={inputLabelSx}>
                Copy Url
              </InputLabel>
              <OutlinedInput
                onClick={handleCopyAllClick}
                autoComplete="off"
                id="copy-url"
                sx={textFieldSx}
                type="text"
                aria-readonly
                defaultValue={lobbyUrl}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleCopyAllClick}>
                      {copiedLobbyUrl ? (
                        <Check sx={checkIconSx} />
                      ) : (
                        <CopyAllIcon sx={copyIconSx} />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Lobby Url"
                ref={inputFieldRef}
                readOnly
              />
            </FormControl>
          </Tooltip>
        </Box>
      </Modal>
    </>
  );
};

export default ShareLobbyModal;
