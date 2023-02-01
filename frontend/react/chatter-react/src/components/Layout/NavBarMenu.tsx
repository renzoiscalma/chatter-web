import BadgeIcon from "@mui/icons-material/Badge";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { Divider, ListItemIcon, Menu, Switch, SxProps } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { useContext } from "react";
import { UsrContxt } from "../../App";
interface NavBarMenuProps {
  menuEl: HTMLElement | null;
  handleClose(): void;
  openChangeUsernameModal(): void;
  openChangeVideoModal(): void;
}

function NavBarMenu({
  menuEl,
  handleClose,
  openChangeUsernameModal,
  openChangeVideoModal,
}: NavBarMenuProps): JSX.Element {
  const userContext = useContext(UsrContxt);
  const theme = useTheme();

  const menuStyle: SxProps = {
    transform: "translateY(36px)",
    maxWidth: "300px",
    ".MuiPaper-root": {
      background: theme.modal?.bgColor,
      color: theme.common.text.secondary,
    },
  };

  const menuItemStyle: SxProps = {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.20)",
    },
  };

  const iconColorStyle: SxProps = {
    color: theme.common.text.secondary,
  };
  return (
    <Menu
      sx={menuStyle}
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
      <MenuItem sx={menuItemStyle} onClick={openChangeUsernameModal}>
        <ListItemIcon>
          <BadgeIcon sx={iconColorStyle} fontSize="small" />
        </ListItemIcon>
        Change Username
      </MenuItem>
      <MenuItem sx={menuItemStyle} onClick={openChangeVideoModal}>
        <ListItemIcon>
          <OndemandVideoIcon sx={iconColorStyle} fontSize="small" />
        </ListItemIcon>
        Change Video
      </MenuItem>
      <Divider sx={{ my: 0.5 }} />
      <MenuItem sx={menuItemStyle} onClick={userContext.darkModeToggle}>
        <ListItemIcon>
          <DarkModeIcon sx={iconColorStyle} fontSize="small" />
        </ListItemIcon>
        Dark Mode
        <Switch
          inputProps={{ "aria-label": "Dark Mode Toggle" }}
          checked={userContext.darkMode}
          onClick={() => (event: React.ChangeEvent<HTMLButtonElement>) => {
            userContext.darkModeToggle();
            event.stopPropagation();
          }}
        ></Switch>
      </MenuItem>
    </Menu>
  );
}

export default NavBarMenu;
