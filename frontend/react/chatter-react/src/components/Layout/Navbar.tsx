import { MutationTuple, useMutation } from "@apollo/client";
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
import { MouseEvent, useContext, useEffect, useState } from "react";
import { UsrContxt } from "../../App";
import { CHANGE_USERNAME } from "../../queries/MessageBar";
import { UPDATE_VIDEO } from "../../queries/Video";
import ChangeUsernameRequest from "../Chatter/interface/requests/ChangeUsernameRequest";
import UpdateVideoStatusRequest from "../Chatter/interface/requests/UpdateVideoStatusRequest";
import GenericResponse from "../Chatter/interface/response/GenericResponse";
import ShareLobbyModal from "../Modals/ShareLobbyModal";
import SimpleModal from "../Modals/SimpleModal";
import NavBarMenu from "./NavBarMenu";

function Navbar(): JSX.Element {
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const [changeVideoModal, setChangeVideoModal] = useState<boolean>(false);
  const [shareLobbyModal, setShareLobbyModal] = useState<boolean>(false);
  const [usernameModal, setUsernameModal] = useState<boolean>(false);
  const userContext = useContext(UsrContxt);
  const theme = useTheme();

  const [videoUrlMutation, videoUrlMutationProps]: MutationTuple<
    { updateVideoStatus: GenericResponse },
    { statusInput: UpdateVideoStatusRequest }
  > = useMutation(UPDATE_VIDEO);

  const [usernameUrlMutation, usernameUrlMutationProps]: MutationTuple<
    { changeUsername: GenericResponse },
    ChangeUsernameRequest
  > = useMutation(CHANGE_USERNAME);

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

  const handleChangeUsername = (newUsername: string): void => {
    userContext.setUsername(newUsername);
    usernameUrlMutation({
      variables: {
        userId: userContext.userId,
        newUsername: newUsername,
      },
    });
  };

  const handleChangeVideo = (newVideoUrl: string): void => {
    videoUrlMutation({
      variables: {
        statusInput: {
          url: newVideoUrl,
          lobbyId: userContext.lobbyId,
          userId: userContext.userId + "-", // needed to update self's video as well
          currTime: 0,
          status: -1,
        },
      },
    });
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

  useEffect(() => {
    if (!videoUrlMutationProps.error) {
      setChangeVideoModal(false);
      handleMenuClose();
    } else console.log("something went wrong updating the video url");
  }, [videoUrlMutationProps.data, videoUrlMutationProps.error]);

  useEffect(() => {
    if (!usernameUrlMutationProps.error) {
      setUsernameModal(false);
      handleMenuClose();
    } else console.log("something went wrong with updating your username");
  }, [usernameUrlMutationProps.data, usernameUrlMutationProps.error]);

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
      <SimpleModal
        opened={changeVideoModal}
        handleCloseModal={() => {
          setChangeVideoModal(false);
        }}
        handleSubmit={handleChangeVideo}
        header={"Input New Video Url"}
        placeholder={"URL"}
      />
      <SimpleModal
        opened={usernameModal}
        handleCloseModal={() => {
          setUsernameModal(false);
        }}
        handleSubmit={handleChangeUsername}
        header={"Input New Username"}
        placeholder={"Username"}
        initialValue={userContext.username}
      />
    </AppBar>
  );
}

export default Navbar;
