import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";

import { MouseEvent, useState } from "react";
import ChangeVideoModal from "../Modals/ChangeVideoModal";
import NameChangeModal from "../Modals/NameChangeModal";

function MessageBar(): JSX.Element {
  const [menuEl, setMenuEl] = useState<null | HTMLElement>(null);
  const [changeUsernameModal, setChangeUsernameModal] =
    useState<boolean>(false);
  const [changeVideoModal, setChangeVideoModal] = useState<boolean>(false);

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

  const handleChangeVideo = (): void => {
    // same here
    console.log("video changed!"); // placeholder for now, change in the future!
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
