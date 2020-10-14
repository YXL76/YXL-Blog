import { AppBar, Box, Container, Typography } from "@material-ui/core";
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
  const data = useStaticQuery<GatsbyTypes.LayoutQuery>(graphql`
    query Layout {
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
          <Box display="flex" py={1}>
            <Box
              display="flex"
              flexGrow={1}
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="overline">
                <Box
                  fontWeight="fontWeightBold"
                  fontSize={24}
                  lineHeight="normal"
                  mr={4}
                >
                  <Link to="/">{data.site?.siteMetadata?.title}</Link>
                </Box>
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
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
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
            </Box>
          </Box>
        </Container>
      </AppBar>
      <Container maxWidth="lg">
        <Box>{children}</Box>
      </Container>
    </>
  );
};
