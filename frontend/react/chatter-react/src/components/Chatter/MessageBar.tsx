import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Settings from "@mui/icons-material/Settings";

import { MouseEvent, useContext, useEffect, useState } from "react";
import ChangeVideoModal from "../Modals/ChangeVideoModal";
import NameChangeModal from "../Modals/NameChangeModal";
import { MutationTuple, useMutation } from "@apollo/client";
import { UPDATE_VIDEO } from "../../queries/Video";
import GenericResponse from "./interface/response/GenericResponse";
import UpdateVideoStatusRequest from "./interface/requests/UpdateVideoStatusRequest";
import { UsrContxt } from "../../App";
import { CHANGE_USERNAME } from "../../queries/MessageBar";
import ChangeUsernameRequest from "./interface/requests/ChangeUsernameRequest";

function MessageBar(): JSX.Element {
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const [changeUsernameModal, setChangeUsernameModal] =
    useState<boolean>(false);
  const [changeVideoModal, setChangeVideoModal] = useState<boolean>(false);
  const userContext = useContext(UsrContxt);

  const [updateVideoUrl, updateVideoUrlProps]: MutationTuple<
    { updateVideoStatus: GenericResponse },
    { statusInput: UpdateVideoStatusRequest }
  > = useMutation(UPDATE_VIDEO);

  const [changeUsernameMutation, changeUsernameMutationProps]: MutationTuple<
    { changeUsername: GenericResponse },
    ChangeUsernameRequest
  > = useMutation(CHANGE_USERNAME);

  const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setMenuEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setMenuEl(null);
  };

  const openChangeUsernameModal = (): void => {
    handleClose();
    setChangeUsernameModal(true);
  };

  const openChangeVideoModal = (): void => {
    handleClose();
    setChangeVideoModal(true);
  };

  const handleChangeUsername = (newUsername: string): void => {
    userContext.setUsername(newUsername);
    changeUsernameMutation({
      variables: {
        userId: userContext.userId,
        newUsername: newUsername,
      },
    });
  };

  const handleChangeVideo = (newUrl: string): void => {
    updateVideoUrl({
      variables: {
        statusInput: {
          url: newUrl,
          lobbyId: userContext.lobbyId,
          userId: userContext.userId + "-", // needed to update self's video as well
          currTime: 0,
          status: -1,
        },
      },
    });
  };

  useEffect(() => {
    if (!updateVideoUrlProps.error) {
      setChangeVideoModal(false);
      handleClose();
    } else console.log("something went wrong updating the video url");
  }, [updateVideoUrlProps.data, updateVideoUrlProps.error]);

  useEffect(() => {
    if (!changeUsernameMutationProps.error) {
      setChangeUsernameModal(false);
      handleClose();
    } else console.log("something went wrong with updating your username");
  }, [changeUsernameMutationProps.data, updateVideoUrlProps.error]);

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography sx={{ flexGrow: 1 }}>chatter</Typography>
          <div>
            <IconButton size="large" onClick={handleMenuOpen} color="inherit">
              <Settings />
            </IconButton>
            <Menu
              anchorEl={menuEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(menuEl)}
              onClose={handleClose}
            >
              <MenuItem>
                Dark Mode
                <Switch
                  inputProps={{ "aria-label": "Dark Mode Toggle" }}
                  checked={userContext.darkMode}
                  onClick={userContext.darkModeToggle}
                ></Switch>
              </MenuItem>
              <MenuItem onClick={openChangeUsernameModal}>
                {" "}
                Change Username{" "}
              </MenuItem>
              <MenuItem onClick={openChangeVideoModal}> Change Video </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
      <ChangeVideoModal
        opened={changeVideoModal}
        handleCloseModal={() => {
          setChangeVideoModal(false);
        }}
        handleChangeVideo={handleChangeVideo}
      />
      <NameChangeModal
        opened={changeUsernameModal}
        handleCloseModal={() => {
          setChangeUsernameModal(false);
        }}
        handleChangeUsername={handleChangeUsername}
      />
    </AppBar>
  );
}
export default MessageBar;
