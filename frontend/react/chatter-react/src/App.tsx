import {
  LazyQueryResultTuple,
  MutationTuple,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSearchParams } from "react-router-dom";
import Lobby from "./components/Chatter/interface/Lobby";
import IsLobbyExistingRequest from "./components/Chatter/interface/requests/IsLobbyExistingRequest";
import AddNewUserResponse from "./components/Chatter/interface/response/AddNewUserResponse";
import IsLobbyExistingResponse from "./components/Chatter/interface/response/IsLobbyExistingResponse";
import UserContext from "./components/Chatter/interface/UserContext";
import Layout from "./components/Layout/Layout";
import LobbyModal from "./components/Modals/LobbyModal";
import { ADD_NEW_USER, CREATE_LOBBY, IS_LOBBY_EXISTING } from "./queries/App";
import { darkTheme, lightTheme } from "./theme";

export const UsrContxt = createContext<UserContext>({
  username: "",
  userId: "",
  lobbyId: "",
  darkMode: true,
  setUsername: () => {},
  darkModeToggle: () => {},
});

function App(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [lobbyId, setLobbyId] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [userCookie, setUserCookie] = useCookies(["user-cookie"]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [lobbyModal, setLobbyModal] = useState<boolean>(false);

  // TODO ADD PROPER TYPES
  const [newUserMutation, newUserMutationRes]: MutationTuple<
    { addNewUser: AddNewUserResponse },
    null
  > = useMutation(ADD_NEW_USER);

  const [createLobbyMutation, createLobbyMutationRes]: MutationTuple<
    { createLobby: Lobby },
    null
  > = useMutation(CREATE_LOBBY);

  const [isLobbyExisting, isLobbyExistingRes]: LazyQueryResultTuple<
    { isLobbyExisting: IsLobbyExistingResponse },
    IsLobbyExistingRequest
  > = useLazyQuery(IS_LOBBY_EXISTING);

  const createLobby = () => {
    // todo create loading screen when loading a lobby
    console.log("creating lobby...");
    // TODO add 1 second delay, loading = true modal should have a spinner inside
    createLobbyMutation();
  };

  const handleSetUsername = (username: string) => {
    setUsername(username);
  };

  const handleCloseModal = () => {
    setLobbyModal(false);
  };

  const handleDarkModeToggle = () => {
    console.log("dark mode toggled!");
    setDarkMode((val) => !val);
  };

  useEffect(() => {
    if (!userCookie?.["user-cookie"]) {
      newUserMutation();
    } else {
      const { userId, username } = userCookie["user-cookie"];
      setUsername(username);
      setUserId(userId);
    }

    const lobbyId = searchParams.get("lobbyId") || "";
    if (lobbyId) {
      isLobbyExisting({
        variables: {
          lobbyId: lobbyId,
        },
      });
    } else {
      setLobbyModal(true);
    }
  }, []);

  useEffect(() => {
    if (newUserMutationRes.data) {
      let { code, success, user } = newUserMutationRes.data.addNewUser;
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
  }, [newUserMutationRes.data]);

  useEffect(() => {
    if (createLobbyMutationRes.data) {
      const { id } = createLobbyMutationRes.data.createLobby;
      setLobbyId(id);
      handleCloseModal();
    }
  }, [createLobbyMutationRes.data]);

  useEffect(() => {
    if (!isLobbyExistingRes.called || isLobbyExistingRes.loading) return;
    const lobbyId = searchParams.get("lobbyId") || "";
    if (
      isLobbyExistingRes.data &&
      isLobbyExistingRes.data.isLobbyExisting.isExisting
    ) {
      setLobbyId(lobbyId);
      handleCloseModal();
    } else {
      setLobbyModal(true);
    }
  }, [isLobbyExistingRes.data]);

  // todo proper loading
  if (newUserMutationRes.loading || newUserMutationRes.error)
    return <>LOADING</>;

  return (
    <UsrContxt.Provider
      value={{
        username,
        setUsername: handleSetUsername,
        userId,
        lobbyId,
        darkMode,
        darkModeToggle: handleDarkModeToggle,
      }}
    >
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <div className="App">
          <LobbyModal
            opened={lobbyModal}
            createLobby={createLobby}
            handleCloseModal={handleCloseModal}
          />
          <Layout />
        </div>
      </ThemeProvider>
    </UsrContxt.Provider>
  );
}

export default App;
