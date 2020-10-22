import type { FC, ReactNode } from "react";
import { Grid, Hidden, Layout } from ".";

type BlogsLayoutProps = {
  right: ReactNode;
};

export const BlogsLayout: FC<BlogsLayoutProps> = ({ children, right }) => (
  <Layout>
    <Grid container>
      <Grid item xs zeroMinWidth>
        {children}
      </Grid>
      <Hidden smDown>
        <Grid item xs={4} className="pl-12">
          {right}
        </Grid>
      </Hidden>
    </Grid>
  </Layout>
);
