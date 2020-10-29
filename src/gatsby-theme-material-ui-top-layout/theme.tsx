import type { ThemeOptions } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";
import merge from "lodash.merge";

const baseOptions: ThemeOptions = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundAttachment: "fixed",
          backgroundImage: "url(/images/background.jpg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          overflowX: "hidden",
        },
      },
    },
    MuiTimelineOppositeContent: { root: { flex: "unset" } },
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
  merge({}, baseOptions, {
    overrides: {
      MuiAppBar: { colorDefault: { backgroundColor: "#fff" } },
    },
    palette: {
      type: "light",
    },
  })
);

export default theme;

export const darkTheme = createMuiTheme(
  merge({}, baseOptions, {
    overrides: {
      MuiAppBar: { colorDefault: { backgroundColor: "#212121" } },
    },
    palette: {
      type: "dark",
      background: { paper: "#212121", default: "#212121" },
    },
  })
);
