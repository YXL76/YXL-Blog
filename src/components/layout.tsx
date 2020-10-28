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
  Paper,
  SEO,
  Slide,
} from ".";
import {
  ArchiveOutlined,
  CategoryOutlined,
  FaceOutlined,
  LanguageSharp,
  LocalOfferOutlined,
  Menu,
  NightsStayOutlined,
  PagesOutlined,
  RssFeedOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import type { FC, ReactNode } from "react";
import React, { useState } from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";

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
  origin: string;
  image?: string;
  className?: string;
};

export const Layout: FC<LayoutProps> = ({
  children,
  trigger,
  title,
  description,
  href,
  origin,
  image,
  className,
}) => {
  const { site } = useStaticQuery<GatsbyTypes.LayoutComponentQuery>(graphql`
    query LayoutComponent {
      site {
        ...AuthorFrontmatter
        siteMetadata {
          title
          defaultImage
          description
          keywords
        }
      }
    }
  `);
  const siteTitle = site?.siteMetadata?.title ?? "";
  const siteDescription = site?.siteMetadata?.description ?? "";
  const { keywords, defaultImage, author } = site?.siteMetadata ?? {};
  const { name, twitter } = author ?? {};

  const [open, setOpen] = useState(false);

  return (
    <>
      <SEO
        title={title}
        siteTitle={siteTitle}
        description={description ?? siteDescription}
        author={name ?? ""}
        href={href}
        keywords={keywords ?? []}
        image={`${origin}${image ?? defaultImage ?? ""}`}
        twitter={twitter ?? ""}
      />
      <Slide appear={false} direction="down" timeout={300} in={!trigger}>
        <AppBar className="h-14" color="default" elevation={1}>
          <Container className="h-full" maxWidth="lg" component="nav">
            <div className="h-full flex py-1">
              <div className="h-full flex flex-grow justify-start items-center">
                <img
                  className="h-full p-2"
                  alt="icon"
                  src="/icons/icon-512x512.png"
                  onClick={() => navigate("/")}
                />
                <Hidden xsDown>
                  <div className="mr-6 font-bold leading-none text-2xl uppercase">
                    <Link to="/" underline="none" color="inherit">
                      {siteTitle}
                    </Link>
                  </div>
                </Hidden>
                <Hidden smDown>
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
                    startIcon={<CategoryOutlined />}
                    to="/categories"
                  >
                    Categories
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
                    to="/archives"
                  >
                    Archives
                  </Button>
                  <Button
                    variant="text"
                    size="large"
                    startIcon={<FaceOutlined />}
                    to="/about"
                  >
                    About
                  </Button>
                </Hidden>
              </div>
              <div className="flex justify-end items-center">
                <IconButton color="inherit" aria-label="search">
                  <SearchOutlined />
                </IconButton>
                <IconButton color="inherit" aria-label="theme">
                  <NightsStayOutlined />
                </IconButton>
                <IconButton color="inherit" aria-label="language">
                  <LanguageSharp />
                </IconButton>
                <IconButton
                  color="inherit"
                  aria-label="rss"
                  onClick={() => navigate("/rss.xml")}
                >
                  <RssFeedOutlined />
                </IconButton>
                <Hidden mdUp>
                  <IconButton
                    color="inherit"
                    onClick={() => setOpen(true)}
                    aria-label="menu"
                  >
                    <Menu />
                  </IconButton>
                </Hidden>
              </div>
            </div>
          </Container>
        </AppBar>
      </Slide>
      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <div className="pl-8 py-4 font-bold leading-none text-2xl uppercase">
          <Link to="/" underline="none">
            {siteTitle}
          </Link>
        </div>
        <List component="nav" className="w-screen-3/5">
          <ListItemLink to="/blogs" text="Blogs" icon={<PagesOutlined />} />
          <ListItemLink
            to="/categories"
            text="Categories"
            icon={<CategoryOutlined />}
          />
          <ListItemLink to="/tags" text="Tags" icon={<LocalOfferOutlined />} />
          <ListItemLink
            to="/archives"
            text="Archives"
            icon={<ArchiveOutlined />}
          />
          <ListItemLink to="/about" text="About" icon={<FaceOutlined />} />
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
        <div>© 2020 · {name}</div>
        <div>
          Build with <Link href="https://www.gatsbyjs.com/">Gatsby</Link>
        </div>
      </Paper>
    </>
  );
};
