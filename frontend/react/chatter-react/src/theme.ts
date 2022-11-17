import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  chat: {
    bubbleFrom: "#2b5278",
    bubbleTo: "#182533",
    bgColor: "#0e1621",
  },
  common: {
    text: {
      primary: "#e4ecf2",
      secondary: "#6d7f8f",
    },
  },
});

export const lightTheme = createTheme({
  chat: {
    bubbleFrom: "#e5e5ea",
    bubbleTo: "#248bf5",
    bgColor: "#ffffff",
  },
  common: {
    text: {
      primary: "#ffffff",
      secondary: "#000000",
    },
  },
});
