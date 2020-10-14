import { Box, Container, Typography } from "@material-ui/core";
import { Link } from "gatsby-theme-material-ui";
import ProTip from "../components/pro-tip";
import React from "react";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Built with love by the `}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI
      </Link>
      {` team.`}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          gatsby-theme-material-ui example
        </Typography>
        <Link to="/">Go to the main page</Link>
        <ProTip />
        <MadeWithLove />
      </Box>
    </Container>
  );
}
