import { BlogCard, Grid, Layout } from "../components";
import React from "react";

export default function App() {
  return (
    <Layout>
      <Grid container xs>
        <Grid item xs={8}>
          <BlogCard />
          <BlogCard />
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Layout>
  );
}
