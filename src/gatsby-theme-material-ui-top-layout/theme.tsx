import { createMuiTheme } from "@material-ui/core";
import red from "@material-ui/core/colors/red";

// A custom theme for this app
const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#f5f5f5",
        },
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
});

export default theme;
