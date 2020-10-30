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
  SEO,
  Slide,
  navigate,
} from ".";
import {
  ArchiveOutlined,
  CategoryOutlined,
  FaceOutlined,
  LanguageSharp,
  LocalOfferOutlined,
  Menu as MenuOutlined,
  NightsStayOutlined,
  PagesOutlined,
  RssFeedOutlined,
  SearchOutlined,
  WbSunnyOutlined,
} from "@material-ui/icons";
import type { FC, ReactNode } from "react";
import React, { useEffect, useState } from "react";
import { languages, siteMetadata } from "../../config";
import { useDarkModeContext, useLocateContext } from "../utils";
import type { Languages } from "../../config";

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
  title: string;
  description?: string;
  href: string;
  pathname: string;
  image?: string;
  className?: string;
};

const pathReg = new RegExp("^\\/((?:[^/]+))(\\/.*)");

export const Layout: FC<LayoutProps> = ({
  children,
  trigger,
  title,
  description,
  href,
  pathname,
  image,
  className,
}) => {
  const { darkMode, toggleDarkMode } = useDarkModeContext();
  const { locate, setLocate, message } = useLocateContext();

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const m = pathReg.exec(pathname.endsWith("/") ? pathname : `${pathname}/`);

  useEffect(() => {
    if (
      m?.length === 3 &&
      m[1] !== locate &&
      Object.keys(languages).includes(m[1])
    ) {
      setLocate(m[1] as Languages);
    }
  }, [locate, m, pathname, setLocate]);

  return (
    <>
      <SEO title={title} description={description} href={href} image={image} />
      <Slide appear={false} direction="down" timeout={300} in={!trigger}>
        <AppBar className="h-14" color="default" elevation={1}>
          <Container className="h-full" maxWidth="lg" component="nav">
            <div className="h-full flex py-1">
              <div className="h-full flex flex-grow justify-start items-center">
                <img
                  className="h-full p-2"
                  alt="icon"
                  src="/icons/icon-512x512.png"
                  onClick={() => navigate(`/${locate}`)}
                />
                <Hidden xsDown>
                  <div className="mr-6 font-bold leading-none text-2xl uppercase">
                    <Link to={`/${locate}`} underline="none" color="inherit">
                      {siteMetadata.title}
                    </Link>
                  </div>
                </Hidden>
                <Hidden smDown>
                  <Button
                    variant="text"
                    size="large"
                    startIcon={<PagesOutlined />}
                    to={`/${locate}/blogs`}
                  >
                    {message["blogs"]}
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    startIcon={<CategoryOutlined />}
                    to={`/${locate}/categories`}
                  >
                    {message["categories"]}
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    startIcon={<LocalOfferOutlined />}
                    to={`/${locate}/tags`}
                  >
                    {message["tags"]}
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    startIcon={<ArchiveOutlined />}
                    to={`/${locate}/archives`}
                  >
                    {message["archives"]}
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    startIcon={<FaceOutlined />}
                    to={`/${locate}/about`}
                  >
                    {message["about"]}
                  </Button>
                </Hidden>
              </div>
              <div className="flex justify-end items-center">
                <IconButton color="inherit" aria-label="search">
                  <SearchOutlined />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="theme"
                  onClick={toggleDarkMode}
                >
                  {darkMode ? <NightsStayOutlined /> : <WbSunnyOutlined />}
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
                        void navigate(
                          m?.length === 3
                            ? `/${language}${m[2]}`
                            : `/${language}${pathname}`
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
      </Slide>
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="pl-8 py-4 font-bold leading-none text-2xl uppercase">
          <Link to={`/${locate}`} underline="none">
            {siteMetadata.title}
          </Link>
        </div>
        <List component="nav" className="w-screen-3/5">
          <ListItemLink
            to={`/${locate}/blogs`}
            text="Blogs"
            icon={<PagesOutlined />}
          />
          <ListItemLink
            to={`/${locate}/categories`}
            text="Categories"
            icon={<CategoryOutlined />}
          />
          <ListItemLink
            to={`/${locate}/tags`}
            text="Tags"
            icon={<LocalOfferOutlined />}
          />
          <ListItemLink
            to={`/${locate}/archives`}
            text="Archives"
            icon={<ArchiveOutlined />}
          />
          <ListItemLink
            to={`/${locate}/about`}
            text="About"
            icon={<FaceOutlined />}
          />
        </List>
      </Drawer>
      <Container
        maxWidth="lg"
        component="main"
        className="pb-10 pt-20 px-4 min-h-screen"
      >
        <div className={`w-full ${className || ""}`}>{children}</div>
      </Container>
      <Paper
        square
        elevation={1}
        className="w-full h-14 flex flex-col items-center justify-around text-base"
      >
        <div>© 2020 · {siteMetadata.author.name}</div>
        <div>
          Build with <Link href="https://www.gatsbyjs.com/">Gatsby</Link>
        </div>
      </Paper>
    </>
  );
};
