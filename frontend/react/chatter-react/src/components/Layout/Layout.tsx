import Box from "@mui/material/Box";
import { SxProps } from "@mui/system";
import { SetStateAction, useEffect, useState } from "react";
import Chatter from "../Chatter/Chatter";
import Video from "../Video/Video";
import Navbar from "./Navbar";

function Layout(): JSX.Element {
  const [chatHidden, setChatHidden] = useState<boolean>(false);
  const [gridContainer, setGridContainer] = useState<SxProps>(gridContainerSx);
  const [videoContainer, setVideoContainer] =
    useState<SxProps>(videoContainerSx);
  const [chatContainer, setChatContainer] = useState<SxProps>(chatContainerSx);

  useEffect(() => {
    setGridContainer((prev: SetStateAction<SxProps<{}>>) => {
      let style: SxProps = {
        ...prev,
        gridTemplateAreas: chatHidden ? gridHiddenChat : gridVisibleChat,
      };
      return style;
    });

    setVideoContainer((prev: SetStateAction<SxProps<{}>>) => {
      let style: SxProps = {
        ...prev,
        width: chatHidden ? "100vw" : "70vw",
      };
      return style;
    });

    setChatContainer((prev: SetStateAction<SxProps<{}>>) => {
      let style: SxProps = {
        ...prev,
        left: chatHidden ? "calc(100vh - 10v)" : 0,
      };
      return style;
    });
  }, [chatHidden]);

  return (
    <Box sx={gridContainer}>
      <Box sx={navBarConatiner}>
        <Navbar></Navbar>
      </Box>

      <Box sx={videoContainer}>
        <Video></Video>
      </Box>
      <Box sx={chatContainer}>
        <Chatter
          chatHidden={chatHidden}
          setChatHidden={setChatHidden}
        ></Chatter>
      </Box>
    </Box>
  );
}

const gridContainerSx: SxProps = {
  display: "inline-grid",
  columnGap: 0,
  gridTemplateAreas: `
    "navbar navbar navbar navbar"
		"video video video chat"
		"video video video chat"
		"video video video chat"
	`,
  overflow: "hidden",
  maxWidth: "100vw",
  transition: "all 0.5s ease-in-out",
};

const gridHiddenChat: string = `
  "navbar navbar navbar navbar"
  "video video video chat"
  "video video video chat"
  "video video video chat"
`;

const gridVisibleChat: string = `
  "navbar navbar navbar navbar"
  "video video video chat"
  "video video video chat"
  "video video video chat"
`;

const navBarConatiner: SxProps = {
  gridArea: "navbar",
};

const chatContainerSx: SxProps = {
  gridArea: "chat",
  position: "relative",
  height: "calc(100vh - 64px)", // -64 pixels because of the height of nav bar
  transition: "all 0.5s ease-in-out",
};

const videoContainerSx: SxProps = {
  gridArea: "video",
  width: "70vw",
  transition: "all 0.5s ease-in-out",
};

export default Layout;
