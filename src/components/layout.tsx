import { AppBar, Container, Typography } from ".";
import {
  ArchiveOutlined,
  FaceOutlined,
  LanguageSharp,
  LocalOfferOutlined,
  NightsStayOutlined,
  PagesOutlined,
  RssFeedOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import { Button, IconButton, Link } from "gatsby-theme-material-ui";
import { graphql, useStaticQuery } from "gatsby";
import type { FC } from "react";

export const Layout: FC = ({ children }) => {
  const data = useStaticQuery<GatsbyTypes.LayoutComponentsQuery>(graphql`
    query LayoutComponents {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Container maxWidth="lg">
          <div className="flex py-1">
            <div className="flex flex-grow justify-start items-center">
              <Typography variant="overline">
                <div className="mr-6 font-bold leading-none text-2xl">
                  <Link to="/">{data.site?.siteMetadata?.title}</Link>
                </div>
              </Typography>
              <Button
                variant="text"
                size="large"
                startIcon={<PagesOutlined />}
                to="/blogs"
              >
                Blogs
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<LocalOfferOutlined />}
                to="/tags"
              >
                Tags
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<ArchiveOutlined />}
                to="/categories"
              >
                Categories
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<FaceOutlined />}
                to="/authors"
              >
                Authors
              </Button>
            </div>
            <div className="flex justify-end items-center">
              <IconButton color="inherit">
                <SearchOutlined />
              </IconButton>
              <IconButton color="inherit">
                <NightsStayOutlined />
              </IconButton>
              <IconButton color="inherit">
                <LanguageSharp />
              </IconButton>
              <IconButton color="inherit">
                <RssFeedOutlined />
              </IconButton>
            </div>
          </div>
        </Container>
      </AppBar>
      <Container maxWidth="lg" className="flex flex-wrap">
        <>{children}</>
      </Container>
    </>
  );
};
