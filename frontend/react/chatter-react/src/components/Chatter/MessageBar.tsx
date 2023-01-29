import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import KeyboardTabIcon from "@mui/icons-material/KeyboardTab";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { SetStateAction, useState } from "react";

interface messageBarProps {
  chatHidden: boolean;
  setChatHidden: Function;
}
function MessageBar({
  setChatHidden,
  chatHidden,
}: messageBarProps): JSX.Element {
  const theme = useTheme();
  const [iconStyle, setIconStyle] = useState<SxProps>({
    flexGrow: 0,
    transition: "all 0.5s ease-in",
    left: "0",
  });

  const appBarStyle: SxProps = {
    bgcolor: theme.appBar.bgColor,
  };

  const toolBarStyle: SxProps = {
    minHeight: "50px " + "!important",
    height: "50px " + "!important",
  };

  const typographyStyle: SxProps = {
    flexGrow: 0,
    margin: "0 auto",
  };

  const toggleChat = (): void => {
    setIconStyle((prev: SetStateAction<SxProps<{}>>) => {
      let style: SxProps = {
        ...prev,
        position: chatHidden ? "absolute" : "relative",
        left: chatHidden ? "0" : "-64px",
        transform: chatHidden ? "scaleX(1)" : "scaleX(-1)",
      };
      return style;
    });
    setChatHidden(!chatHidden);
  };

  return (
    <AppBar position="static">
      <Container sx={appBarStyle}>
        <Toolbar sx={toolBarStyle} disableGutters>
          <IconButton
            size="medium"
            onClick={toggleChat}
            color="inherit"
            sx={iconStyle}
          >
            <KeyboardTabIcon />
          </IconButton>
          <Box sx={typographyStyle}>
            <Typography>LOBBY CHAT</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MessageBar;
