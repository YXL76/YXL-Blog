import { createMuiTheme } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

// A custom theme for this app
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          backgroundColor: "#fafafa",
        },
      },
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: "#ff",
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
