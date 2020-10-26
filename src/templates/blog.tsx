import {
  AuthorCard,
  BlogBanner,
  ButtonBase,
  Card,
  Grid,
  Hidden,
  Layout,
  Link,
  Mdx,
  TOC,
  Tab,
  TabPanel,
  Tabs,
  useScrollTrigger,
} from "../components";
import {
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import type { PageProps } from "gatsby";
import type { TocItem } from "../components";
import { graphql } from "gatsby";

export default function App({
  location: { href, origin },
  data: { mdx, next, prev },
}: PageProps<GatsbyTypes.BlogsTemplatesQuery>) {
  const { words } = mdx?.wordCount ?? {};
  const { title, subtitle, category, date, banner, caption } =
    mdx?.frontmatter ?? {};
  const near = [prev, next] as (null | {
    frontmatter: {
      title: string;
      banner: { childImageSharp: { fluid: FluidObject | FluidObject[] } };
    };
    slug: string;
  })[];
  const tableOfContents: TocItem = mdx?.tableOfContents ?? ({} as TocItem);

  const trigger = useScrollTrigger();
  const [value, setValue] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length === 1 && entries[0].isIntersecting) {
          setActive(entries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );
    document
      .querySelectorAll(".mdx-content > h2, .mdx-content > h3")
      .forEach((node) => {
        observer.observe(node);
      });

    return () => {
      observer.disconnect();
    };
  });

  return (
    <Layout
      href={href}
      origin={origin}
      title={title ?? ""}
      description={mdx.excerpt}
      trigger={trigger}
      image={banner.childImageSharp.original.src}
    >
      {banner?.childImageSharp?.fluid && category && (
        <BlogBanner
          img={banner.childImageSharp.fluid}
          category={category}
          title={title}
          subtitle={subtitle}
          date={date}
          words={words}
          timeToRead={mdx?.timeToRead}
          caption={caption}
        />
      )}
      <Grid container className="mt-6">
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
                    <Link to={`/${item.slug}`}>
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
            <Card
              className={`group sticky overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-toc duration-300 ease-out ${
                trigger ? "top-6 ease-slide-exit" : "top-20"
              }`}
            >
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
                  {TOC(tableOfContents?.items ?? [], `#${active}`)}
                </nav>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AuthorCard className="max-h-screen-3/4 overflow-y-auto" />
              </TabPanel>
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </Layout>
  );
}

export const query = graphql`
  query BlogTemplate($id: String!, $next: String!, $previous: String!) {
    mdx(id: { eq: $id }) {
      body
      tableOfContents(maxDepth: 3)
      frontmatter {
        banner {
          childImageSharp {
            original {
              src
            }
            fluid(maxWidth: 2560) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      ...BlogFrontmatter
      excerpt
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
  }
`;
