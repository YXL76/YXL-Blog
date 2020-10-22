import type { FC, ReactNode } from "react";
import { Grid, Hidden, Layout } from ".";

type BlogsLayoutProps = {
  right: ReactNode;
  trigger: boolean;
};

export const BlogsLayout: FC<BlogsLayoutProps> = ({
  children,
  right,
  trigger,
}) => (
  <Layout trigger={trigger}>
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
