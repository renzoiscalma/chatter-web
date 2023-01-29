import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

function MessageBar(): JSX.Element {
  const theme = useTheme();

  const appBarStyle: SxProps = {
    bgcolor: theme.appBar.bgColor,
  };

  const toolBarStyle: SxProps = {
    justifyContent: "center",
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Container>
        <Toolbar sx={toolBarStyle} disableGutters>
          <Box>
            <Typography>LOBBY CHAT</Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MessageBar;
