import Box from "@mui/material/Box";
import Video from "../Video/Video";
import Chatter from "../Chatter/Chatter";
import { SxProps } from "@mui/system";
import Navbar from "./Navbar";

function Layout(): JSX.Element {
  return (
    <Box sx={gridContainer}>
      <Box sx={navBarConatiner}>
        <Navbar></Navbar>
      </Box>

      <Box sx={videoContainer}>
        <Video></Video>
      </Box>
      <Box sx={chatContainer}>
        <Chatter></Chatter>
      </Box>
    </Box>
  );
}

const border: SxProps = {
  // borderRadius: "2px",
  // border: "1px solid",
};

const gridContainer: SxProps = {
  display: "inline-grid",
  columnGap: 0,
  gridTemplateAreas: `
    "navbar navbar navbar navbar"
		"video video video chat"
		"video video video chat"
		"video video video chat"
	`,
  overflow: "hidden",
};

const navBarConatiner: SxProps = {
  gridArea: "navbar",
};

const chatContainer: SxProps = {
  gridArea: "chat",
  height: "calc(100vh - 64px)",
  ...border,
};

const videoContainer: SxProps = {
  gridArea: "video",
  width: "70vw",

  ...border,
};

export default Layout;
