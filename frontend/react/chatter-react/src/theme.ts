import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  chat: {
    bubbleFrom: "#182533",
    bubbleTo: "#2b5278",
    bgColor: "#0e1621",
  },
  common: {
    text: {
      primary: "#e4ecf2",
      secondary: "#6d7f8f",
    },
    base: "#0e1621",
  },
  appBar: {
    bgColor: "#17212b",
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
    base: "#ffffff",
  },
  appBar: {
    bgColor: "#248bf5",
  },
});
