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
import React from "react";

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
          <div className="flex app-bar__container">
            <div className="flex flex-grow-1 flex-justify-content-start flex-align-items-center">
              <Typography variant="overline">
                <div className="app-bar__title">
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
                to="/about"
              >
                About
              </Button>
            </div>
            <div className="flex flex-justify-content-end flex-align-items-center">
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
      <Container maxWidth="lg">
        <>{children}</>
      </Container>
    </>
  );
};
