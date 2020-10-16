import type { FC, ReactNode } from "react";
import { Grid, Layout } from ".";
import React from "react";

type BlogsLayoutProps = {
  right?: ReactNode;
};

export const BlogsLayout: FC<BlogsLayoutProps> = ({ children }) => {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={8}>
          {children}
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Layout>
  );
};
