import { createMuiTheme } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

// A custom theme for this app
const theme = createMuiTheme({
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
    MuiAppBar: {
      colorDefault: {
        backgroundColor: "#fff",
      },
    },
    MuiTimelineOppositeContent: {
      root: {
        flex: "unset",
      },
    },
  },
  palette: {
    primary: {
      main: `#556cd6`,
    },
    secondary: {
      main: `#19857b`,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: `#fff`,
    },
  },
  typography: {
    fontFamily: `"Noto Sans SC", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default theme;
