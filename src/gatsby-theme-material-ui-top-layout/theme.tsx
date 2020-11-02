import type { ThemeOptions } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";
import merge from "lodash.merge";

const baseOptions: ThemeOptions = {
  components: {
    MuiTimelineOppositeContent: { styleOverrides: { root: { flex: "unset" } } },
  },
  palette: {
    primary: {
      light: blue[500],
      main: blue[600],
      dark: blue[700],
    },
  },
  typography: {
    fontFamily: `"Noto Sans SC", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
};

const theme = createMuiTheme(
  merge<ThemeOptions, ThemeOptions, ThemeOptions>({}, baseOptions, {
    components: {
      MuiAppBar: {
        styleOverrides: { colorDefault: { backgroundColor: "#fff" } },
      },
    },
    palette: {
      mode: "light",
    },
  })
);

export default theme;

export const darkTheme = createMuiTheme(
  merge<ThemeOptions, ThemeOptions, ThemeOptions>({}, baseOptions, {
    components: {
      MuiAppBar: {
        styleOverrides: { colorDefault: { backgroundColor: "#212121" } },
      },
    },
    palette: {
      mode: "dark",
      background: { paper: "#212121", default: "#212121" },
    },
  })
);
