import { Box, Layout, Link, Typography } from "../components";
import React from "react";

export default function App() {
  return (
    <Layout>
      <Box my={4}>
        <Typography>gatsby-theme-material-ui example</Typography>
        <Link to="/about" color="secondary">
          Go to the about page
        </Link>
      </Box>
    </Layout>
  );
}
