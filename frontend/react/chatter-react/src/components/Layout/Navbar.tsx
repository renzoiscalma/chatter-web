import ClickAwayListener from "@mui/base/ClickAwayListener";
import ReplyIcon from "@mui/icons-material/Reply";
import Settings from "@mui/icons-material/Settings";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { SxProps, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MouseEvent, useContext, useState } from "react";
import { UsrContxt } from "../../App";
import ChangeUsernameModal from "../Modals/ChangeUsernameModal";
import ShareLobbyModal from "../Modals/ShareLobbyModal";
import ChangeVideoModal from "../Modals/SimpleModal";
import NavBarMenu from "./NavBarMenu";

function Navbar(): JSX.Element {
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const [changeVideoModal, setChangeVideoModal] = useState<boolean>(false);
  const [shareLobbyModal, setShareLobbyModal] = useState<boolean>(false);
  const [usernameModal, setUsernameModal] = useState<boolean>(false);
  const userContext = useContext(UsrContxt);
  const theme = useTheme();

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    if (menuEl) setMenuEl(null);
    else setMenuEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setMenuEl(null);
  };

  const openChangeUsernameModal = (): void => {
    handleMenuClose();
    setUsernameModal(true);
  };

  const openChangeVideoModal = (): void => {
    handleMenuClose();
    setChangeVideoModal(true);
  };

  const openShareLobbyModal = (): void => {
    setShareLobbyModal(true);
  };

  const handleChangeVideo = (newVideoUrl: string): void => {
    userContext.setVideo(newVideoUrl);
    setChangeVideoModal(false);
  };

  const shareBtnSx: SxProps = {
    color: theme.common.text.primary,
    marginRight: "24px",
    backgroundColor: "#ED6A5A",
    "&:hover": {
      backgroundColor: "#ED6A5A",
    },
  };

  const appBarStyle: SxProps = {
    bgcolor: theme.appBar.bgColor,
  };

  const containerSx: SxProps = {
    margin: "0",
    padding: "0 10px",
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Container sx={containerSx} maxWidth={false}>
        <Toolbar disableGutters>
          <Typography sx={{ flexGrow: 1 }}>chatter</Typography>
          <Button
            variant="contained"
            sx={shareBtnSx}
            onClick={openShareLobbyModal}
            startIcon={<ReplyIcon />}
          >
            SHARE LOBBY
          </Button>
          <ClickAwayListener onClickAway={handleMenuClose}>
            <Box sx={{ flexGrow: 0 }}>
              <IconButton size="large" onClick={handleMenuOpen} color="inherit">
                <Settings />
              </IconButton>
              <NavBarMenu
                menuEl={menuEl}
                handleClose={handleMenuClose}
                openChangeUsernameModal={openChangeUsernameModal}
                openChangeVideoModal={openChangeVideoModal}
              />
            </Box>
          </ClickAwayListener>
        </Toolbar>
      </Container>
      <ShareLobbyModal
        lobbyUrl={`${process.env.REACT_APP_URI}?lobbyId=${userContext.lobbyId}`}
        opened={shareLobbyModal}
        handleCloseModal={() => {
          setShareLobbyModal(false);
        }}
      />
      <ChangeVideoModal
        opened={changeVideoModal}
        handleCloseModal={() => {
          setChangeVideoModal(false);
        }}
      />
      <ChangeUsernameModal // just separate this lol, then make reusable comopnents
        opened={usernameModal}
        onClose={() => {
          setUsernameModal(false);
        }}
      />
    </AppBar>
  );
}

export default Navbar;
