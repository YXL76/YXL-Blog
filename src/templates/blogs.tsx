import {
  AlarmOutlined,
  AvTimerOutlined,
  EventNoteOutlined,
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from "@material-ui/icons";
import {
  AuthorCard,
  Button,
  ButtonBase,
  Card,
  Grid,
  Hidden,
  Layout,
  Link,
  Mdx,
  MetadataChip,
  Tab,
  TabPanel,
  Tabs,
  useScrollTrigger,
} from "../components";
import type { ChangeEvent } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import { useState } from "react";

type TocItem = {
  url: string;
  title: string;
  items?: TocItem[];
};

const TOC = (items: TocItem[]) => (
  <ul className="list-none">
    {items.map(({ url, title, items }, idx) => (
      <li key={idx} className="list-none">
        <Link
          href={url}
          color="inherit"
          underline="none"
          className="block pl-2 border-0 border-l-4 border-solid border-transparent text-base leading-7 hover:text-blue-400 hover:border-blue-400 transition-colors duration-300 ease-out"
        >
          {title}
        </Link>
        {items && TOC(items)}
      </li>
    ))}
  </ul>
);

export default function App({
  data: { mdx, next, prev, author },
}: PageProps<GatsbyTypes.BlogsTemplatesQuery>) {
  const { words } = mdx?.wordCount ?? {};
  const { title, subtitle, category, date, banner, caption } =
    mdx?.frontmatter ?? {};
  const trigger = useScrollTrigger();
  const [value, setValue] = useState(0);
  const near = [prev, next] as (null | {
    frontmatter: {
      title: string;
      banner: { childImageSharp: { fluid: FluidObject | FluidObject[] } };
    };
    slug: string;
  })[];

  const tableOfContents: TocItem = mdx?.tableOfContents ?? ({} as TocItem);

  return (
    <Layout trigger={trigger}>
      {banner?.childImageSharp?.fluid && (
        <div className="relative overflow-hidden w-full sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
          <Img fluid={banner.childImageSharp.fluid} />
          <div className="absolute left-3 bottom-3 sm:left-6 sm:bottom-6 md:left-12 md:bottom-12">
            <Button
              className="rounded-xl sm:mb-2 md:mb-4"
              variant="contained"
              color="primary"
              to={`/categories/${category ?? ""}`}
            >
              {category}
            </Button>
            <h1 className="leading-tight text-white tracking-wider text-3xl sm:text-4xl md:text-5xl sm:mb-2 md:mb-4">
              {title}
            </h1>
            <h2 className="leading-tight text-white tracking-wide text-xl sm:text-2xl md:text-3xl">
              {subtitle}
            </h2>
          </div>
          <div className="absolute left-3 top-3 sm:left-6 sm:top-6 md:left-12 md:top-12 flex items-center justify-center flex-wrap mt-1">
            <MetadataChip
              className="text-white sm:text-lg md:text-xl"
              icon={
                <EventNoteOutlined className="text-white text-xl md:text-2xl" />
              }
              label={date}
            />
            <MetadataChip
              className="text-white sm:text-lg md:text-xl"
              icon={
                <AvTimerOutlined className="text-white text-xl md:text-2xl" />
              }
              label={words}
            />
            <MetadataChip
              className="text-white sm:text-lg md:text-xl"
              icon={
                <AlarmOutlined className="text-white text-xl md:text-2xl" />
              }
              label={`${mdx?.timeToRead ?? ""} min`}
            />
          </div>
          {caption && (
            <div className="absolute right-0 bottom-0 px-2">
              <Link
                className="bg-black bg-opacity-50 rounded text-white tracking-wide text-xs sm:text-sm md:text-base"
                underline="none"
                {...caption}
              />
            </div>
          )}
        </div>
      )}
      <Grid
        container
        className={`mt-6 md:mt-20 transform transition-transform duration-300 ease-out ${
          trigger ? "ease-slide-exit md:-translate-y-14" : ""
        }`}
      >
        <Grid item xs zeroMinWidth>
          <Mdx className="bg-white mb-4 px-6 py-2 sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
            {mdx?.body ?? ""}
          </Mdx>
          <div className="flex justify-between flex-col sm:flex-row">
            {near.map((item, idx) =>
              item ? (
                <div
                  key={idx}
                  className="w-full sm:w-15/32 relative my-4 overflow-hidden sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Img fluid={item.frontmatter.banner.childImageSharp.fluid} />
                  <div className="absolute left-0 right-0 top-1/5 font-bold text-white text-center text-3xl sm:text-2xl lg:text-3xl tracking-wide">
                    {item.frontmatter.title}
                  </div>
                  <ButtonBase
                    className={`absolute ${
                      idx === 0 ? "left-6" : "right-6"
                    } bottom-6 bg-blue-400 h-12 w-12 rounded-3xl`}
                  >
                    <Link to={`/blogs/${item.slug}`}>
                      {idx === 0 ? (
                        <NavigateBeforeOutlined className="text-white text-5xl" />
                      ) : (
                        <NavigateNextOutlined className="text-white text-5xl" />
                      )}
                    </Link>
                  </ButtonBase>
                </div>
              ) : (
                <div key={idx} className="w-full sm:w-15/32" />
              )
            )}
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item xs={4} className="pl-12">
            <Card className="group sticky top-20 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <Tabs
                value={value}
                onChange={(_event: ChangeEvent<{}>, newValue: number) => {
                  setValue(newValue);
                }}
                variant="fullWidth"
              >
                <Tab label="Contents" />
                <Tab label="Author" />
              </Tabs>
              <TabPanel value={value} index={0}>
                <nav className="-ml-8 pr-4 max-h-screen-3/4 overflow-y-auto">
                  {TOC(tableOfContents?.items ?? [])}
                </nav>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AuthorCard
                  className="max-h-screen-3/4 overflow-y-auto"
                  title={author?.frontmatter?.name ?? ""}
                  avatar={author?.frontmatter?.avatar?.publicURL ?? ""}
                  role={author?.frontmatter?.role ?? ""}
                  bio={author?.frontmatter?.bio ?? ""}
                  social={author?.frontmatter?.social ?? []}
                />
              </TabPanel>
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </Layout>
  );
}

export const query = graphql`
  query BlogsTemplates($id: String!, $next: String!, $previous: String!) {
    mdx(id: { eq: $id }) {
      body
      tableOfContents(maxDepth: 3)
      ...BlogFrontmatter
    }
    next: mdx(id: { eq: $next }) {
      frontmatter {
        banner {
          childImageSharp {
            fluid(maxWidth: 1280, maxHeight: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
      }
      slug
    }
    prev: mdx(id: { eq: $previous }) {
      frontmatter {
        banner {
          childImageSharp {
            fluid(maxWidth: 1280, maxHeight: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        title
      }
      slug
    }
    author: mdx(fields: { contentType: { eq: "authors" } }) {
      ...AuthorFrontmatter
    }
  }
`;
