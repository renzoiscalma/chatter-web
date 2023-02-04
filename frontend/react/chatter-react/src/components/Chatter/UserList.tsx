import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, SxProps, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { StrictMode } from "react";

const lobbyListContainer: SxProps = {
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  height: "100%",
  margin: "24px 0",
};

const userContainer: SxProps = {
  display: "flex",
  flexDirection: "row",
  marginBottom: "12px",
  marginLeft: "32px",
};

function UserList(): JSX.Element {
  const theme = useTheme();

  const userIcon: SxProps = {
    width: "24px",
    height: "24px",
    marginRight: "8px",
    color: theme.common.text.secondary,
    flexShrink: 0,
  };

  const nameStyle: SxProps = {
    color: theme.common.text.secondary,
    flexShrink: 0,
  };

  // todo should be from props
  const users: any = [
    {
      name: "Gamer Croquette",
    },
    {
      name: "Emerald Elephant",
    },
    {
      name: "Ripe Mangoes",
    },
    {
      name: "Powerful Chocolate",
    },
  ];
  return (
    <StrictMode>
      <Box sx={lobbyListContainer}>
        {users ? (
          users.map((user: any) => (
            <Box sx={userContainer}>
              <AccountCircleIcon sx={userIcon} />
              <Typography sx={nameStyle}>{user.name}</Typography>
            </Box>
          ))
        ) : (
          <p>No one's here... There should be someone at least here...</p>
        )}
      </Box>
    </StrictMode>
  );
}
export default UserList;
