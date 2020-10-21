import type { FC, ReactNode } from "react";
import { Grid, Layout, useMediaQuery } from ".";
import theme from "../gatsby-theme-material-ui-top-layout/theme";

type BlogsLayoutProps = {
  right: ReactNode;
};

export const BlogsLayout: FC<BlogsLayoutProps> = ({ children, right }) => {
  const breakpoint = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Layout>
      <Grid container>
        <Grid item xs={breakpoint ? 8 : 12} className="pr-4">
          {children}
        </Grid>
        {breakpoint && (
          <Grid item xs={4} className="pl-12">
            {right}
          </Grid>
        )}
      </Grid>
    </Layout>
  );
};
