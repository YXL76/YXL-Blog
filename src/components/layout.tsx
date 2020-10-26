import {
  AppBar,
  Container,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
import { Button, IconButton, Link } from "gatsby-theme-material-ui";
import type { FC, ReactNode } from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { useState } from "react";

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
};

export const Layout: FC<LayoutProps> = ({
  children,
  trigger,
  title,
  description,
  href,
  origin,
  image,
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
        author={name}
        href={href}
        keywords={keywords}
        image={`${origin}${image ?? defaultImage}`}
        twitter={twitter}
      />
      <Slide appear={false} direction="down" timeout={300} in={!trigger}>
        <AppBar className="h-14" color="default" elevation={1}>
          <Container maxWidth="lg">
            <div className="flex py-1">
              <div className="flex flex-grow justify-start items-center">
                <Hidden xsDown>
                  <div className="mr-6 font-bold leading-none text-2xl uppercase">
                    <Link to="/" underline="none">
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
                <Hidden mdUp>
                  <IconButton color="inherit" onClick={() => setOpen(true)}>
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
        className="flex flex-wrap pb-10 pt-20 px-0 sm:px-4"
      >
        <>{children}</>
      </Container>
    </>
  );
};
