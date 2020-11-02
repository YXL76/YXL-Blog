import {
  AppBar,
  Button,
  Container,
  Drawer,
  Hidden,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Search,
  Slide,
  navigate,
} from ".";
import {
  ArchiveOutlined,
  Brightness7Outlined,
  CategoryOutlined,
  FaceOutlined,
  LanguageSharp,
  LocalOfferOutlined,
  Menu as MenuOutlined,
  NightsStayOutlined,
  PagesOutlined,
  RssFeedOutlined,
} from "@material-ui/icons";
import type { FC, ReactNode } from "react";
import React, { useMemo, useState } from "react";
import { author, languages } from "../../config";
import { message } from "../i18n";
import { useLocateContext } from "../utils";

type ListItemLinkProps = {
  to: string;
  text: string;
  icon: ReactNode;
};

const ListItemLink = ({ to, text, icon }: ListItemLinkProps) => (
  <ListItem button onClick={() => navigate(to)}>
    <ListItemIcon className="ml-4" style={{ color: "inherit" }}>
      {icon}
    </ListItemIcon>
    <ListItemText
      disableTypography
      className="font-medium text-base"
      primary={text}
    />
  </ListItem>
);

type LayoutProps = {
  trigger: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const Layout: FC<LayoutProps> = ({
  children,
  trigger,
  darkMode,
  toggleDarkMode,
}) => {
  const { locate } = useLocateContext();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const appBar = useMemo(
    () => (
      <AppBar className="h-14" color="default" elevation={1}>
        <Container className="h-full px-0" maxWidth="lg" component="nav">
          <div className="h-full flex py-1">
            <div className="h-full flex flex-grow justify-start items-center">
              <img
                className="cursor-pointer h-full p-2"
                alt="icon"
                src="/icons/icon-512x512.png"
                width={48}
                height={48}
                onClick={() => navigate(`/${locate}`)}
              />
              <Hidden smDown>
                <div
                  className="cursor-pointer mr-6 font-bold leading-none text-2xl uppercase"
                  onClick={() => navigate(`/${locate}`)}
                >
                  {message[locate]["title"]}
                </div>
              </Hidden>
              <Hidden mdDown>
                <Button
                  variant="text"
                  color="inherit"
                  size="large"
                  startIcon={<PagesOutlined />}
                  onClick={() => navigate(`/${locate}/blogs`)}
                >
                  {message[locate]["blogs"]}
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  size="large"
                  startIcon={<CategoryOutlined />}
                  onClick={() => navigate(`/${locate}/categories`)}
                >
                  {message[locate]["categories"]}
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  size="large"
                  startIcon={<LocalOfferOutlined />}
                  onClick={() => navigate(`/${locate}/tags`)}
                >
                  {message[locate]["tags"]}
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  size="large"
                  startIcon={<ArchiveOutlined />}
                  onClick={() => navigate(`/${locate}/archives`)}
                >
                  {message[locate]["archives"]}
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  size="large"
                  startIcon={<FaceOutlined />}
                  onClick={() => navigate(`/${locate}/about`)}
                >
                  {message[locate]["about"]}
                </Button>
              </Hidden>
            </div>
            <div className="flex justify-end items-center">
              <Search indexName={locate} />
              <IconButton
                color="inherit"
                aria-label="theme"
                onClick={toggleDarkMode}
              >
                {darkMode ? <NightsStayOutlined /> : <Brightness7Outlined />}
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="language"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <LanguageSharp />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="rss"
                onClick={() => navigate(`/${locate}/rss.xml`)}
              >
                <RssFeedOutlined />
              </IconButton>
              <Hidden mdUp>
                <IconButton
                  color="inherit"
                  onClick={() => setOpenDrawer(true)}
                  aria-label="menu"
                >
                  <MenuOutlined />
                </IconButton>
              </Hidden>
              <Menu
                id="menu-language"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={openMenu}
                onClose={() => setAnchorEl(null)}
              >
                {Object.entries(languages).map(([language, display], idx) => (
                  <MenuItem
                    key={idx}
                    onClick={() => {
                      setAnchorEl(null);
                      const { pathname } = document.location;
                      void navigate(
                        pathname === "/"
                          ? `/${language}`
                          : pathname.replace(/^\/(?:[^/]+)/, `/${language}`)
                      );
                    }}
                  >
                    {display}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
        </Container>
      </AppBar>
    ),
    [anchorEl, darkMode, locate, openMenu, toggleDarkMode]
  );

  return (
    <>
      <Slide appear={false} direction="down" timeout={300} in={!trigger}>
        {appBar}
      </Slide>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div
          className="cursor-pointer text-primary pl-8 py-4 font-bold leading-none text-2xl uppercase"
          onClick={() => navigate(`/${locate}`)}
        >
          {message[locate]["title"]}
        </div>
        <List component="nav" className="w-screen-3/5">
          <ListItemLink
            to={`/${locate}/blogs`}
            text={message[locate]["blogs"]}
            icon={<PagesOutlined />}
          />
          <ListItemLink
            to={`/${locate}/categories`}
            text={message[locate]["categories"]}
            icon={<CategoryOutlined />}
          />
          <ListItemLink
            to={`/${locate}/tags`}
            text={message[locate]["tags"]}
            icon={<LocalOfferOutlined />}
          />
          <ListItemLink
            to={`/${locate}/archives`}
            text={message[locate]["archives"]}
            icon={<ArchiveOutlined />}
          />
          <ListItemLink
            to={`/${locate}/about`}
            text={message[locate]["about"]}
            icon={<FaceOutlined />}
          />
        </List>
      </Drawer>
      <Container
        maxWidth="lg"
        component="main"
        className="pb-10 pt-20 px-2 min-h-screen"
      >
        <>{children}</>
      </Container>
      <Paper
        square
        elevation={1}
        className="w-full h-14 flex flex-col items-center justify-around text-base"
      >
        <div>© 2020 · {author.name}</div>
        <div>
          Build with <Link href="https://www.gatsbyjs.com/">Gatsby</Link>
        </div>
      </Paper>
    </>
  );
};
