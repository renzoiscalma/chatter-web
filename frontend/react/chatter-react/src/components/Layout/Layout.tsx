import Box from "@mui/material/Box";
import Video from "../Video/Video";
import Chatter from "../Chatter/Chatter";
import { SxProps } from "@mui/system";
import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { ADD_NEW_USER } from "../Queries/Lobby";
import { MutationTuple, useMutation } from "@apollo/client";

export const UserContext = createContext({
  username: "",
  userId: "",
  lobbyId: "",
  setUsername: (username: string) => {},
});

function Layout(): JSX.Element {
  // TODO DECIDE WHAT NEW NAME FOR THIS. BC THIS IS NOT SIMPLY A LAYOUT COMPONENT
  // todo double check context, should be done when trying to fchange username
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [lobbyId, setLobbyId] = useState<string>("633c71d566f605851babba3e");
  const [userCookie, setUserCookie] = useCookies(["user-cookie"]);

  const handleSetUsername = (username: string) => {
    setUsername(username);
  };

  // TODO ADD PROPER TYPES
  const [newUser, newUserQueryRes]: MutationTuple<any, any> =
    useMutation(ADD_NEW_USER);

  useEffect(() => {
    if (!userCookie?.["user-cookie"]) {
      newUser();
    } else {
      const { userId, username } = userCookie["user-cookie"];
      setUsername(username);
      setUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (newUserQueryRes.data) {
      let { code, success, user } = newUserQueryRes.data.addNewUser;
      if (code === 200 && success) {
        setUsername(user.username);
        setUserId(user.id);
        setUserCookie(
          "user-cookie",
          { userId: user.id, username: user.username },
          {
            path: "/",
            expires: new Date("11-10-2023"),
          }
        );
      }
    }
  }, [newUserQueryRes.data]);

  if (newUserQueryRes.loading || newUserQueryRes.error) return <>LOADING</>;
  return (
    <UserContext.Provider
      value={{ username, setUsername: handleSetUsername, userId, lobbyId }}
    >
      <Box sx={gridContainer}>
        <Box sx={videoContainer}>
          <Video videoId="rokGy0huYEA"></Video>
        </Box>
        <Box sx={chatContainer}>
          <Chatter></Chatter>
        </Box>
      </Box>
    </UserContext.Provider>
  );
}

const border: SxProps = {
  borderRadius: "2px",
  border: "1px solid",
};

const gridContainer: SxProps = {
  display: "inline-grid",
  columnGap: 1,
  gridTempateColumns: "3fr 1fr",
  gridTemplateAreas: `
		"video video video chat"
		"video video video chat"
		"video video video chat"
	`,
};

const chatContainer: SxProps = {
  gridArea: "chat",
  width: "29vw",
  height: "calc(100vh - 2px)",
  ...border,
};

const videoContainer: SxProps = {
  gridArea: "video",
  width: "70vw",
  height: "calc(100vh - 2px)",
  ...border,
};

const miscContainer: SxProps = {
  gridArea: "misc",
  width: "28vw",
  height: "29vh",
  ...border,
};

export default Layout;
