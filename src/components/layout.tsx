import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Typography,
} from "@material-ui/core";
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
import type { FC } from "react";
import React from "react";

export const Layout: FC = ({ children }) => (
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
                YXL Blog
              </Box>
            </Typography>
            <Button variant="text" size="large" startIcon={<PagesOutlined />}>
              Blogs
            </Button>
            <Button
              variant="text"
              size="large"
              startIcon={<LocalOfferOutlined />}
            >
              Tags
            </Button>
            <Button variant="text" size="large" startIcon={<ArchiveOutlined />}>
              Categories
            </Button>
            <Button variant="text" size="large" startIcon={<FaceOutlined />}>
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
