import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";

import { MouseEvent, useContext, useState } from "react";
import ChangeVideoModal from "../Modals/ChangeVideoModal";
import NameChangeModal from "../Modals/NameChangeModal";
import { MutationTuple, useMutation } from "@apollo/client";
import { UPDATE_VIDEO } from "../../queries/Video";
import GenericResponse from "./interface/response/GenericResponse";
import UpdateVideoStatusRequest from "./interface/requests/UpdateVideoStatusRequest";
import { UsrContxt } from "../../App";

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

  const handleChangeUsername = (): void => {
    // implementation would be hard for updating, might need websockets
    console.log("username changed!"); // placeholder for now, change in the future!
  };

  const handleChangeVideo = (newUrl: string): void => {
    console.log(newUrl);
    updateVideoUrl({
      variables: {
        statusInput: {
          url: newUrl,
          lobbyId: userContext.lobbyId,
          userId: userContext.userId + "-",
          currTime: 0,
          status: -1,
        },
      },
    });
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography sx={{ flexGrow: 1 }}>Hello World</Typography>
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
              <MenuItem> Dark Mode </MenuItem>
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
