import {
  AuthorCard,
  BlogBanner,
  ButtonBase,
  Card,
  Grid,
  Hidden,
  Layout,
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
import { graphql, navigate } from "gatsby";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import type { PageProps } from "gatsby";
import type { TocItem } from "../components";

export default function App({
  location: { href, origin },
  data: { mdx, next, prev },
}: PageProps<GatsbyTypes.BlogTemplateQuery>) {
  const {
    body,
    frontmatter,
    fields,
    excerpt,
    timeToRead,
    wordCount,
    tableOfContents,
  } = mdx ?? {};
  const { title, subtitle, category, date, banner, caption } =
    frontmatter ?? {};
  const { words } = wordCount ?? {};
  const { lastModified } = fields ?? {};

  const near = [prev, next] as (null | {
    frontmatter: {
      title: string;
      banner: { childImageSharp: { fluid: FluidObject | FluidObject[] } };
    };
    slug: string;
  })[];

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
      .querySelectorAll("#mdx-content > h2, #mdx-content > h3")
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
      description={excerpt}
      trigger={trigger}
      image={banner?.childImageSharp?.original?.src}
    >
      <style>{`#mdx-toc #toc-${active} {color: #63b3ed; border-color: #63b3ed;}`}</style>
      {banner?.childImageSharp?.fluid && category && (
        <BlogBanner
          img={banner.childImageSharp.fluid}
          category={category}
          title={title}
          subtitle={subtitle}
          date={date}
          words={words}
          timeToRead={timeToRead}
          caption={caption}
        />
      )}
      <Grid container className="mt-6">
        <Grid item xs zeroMinWidth>
          <Mdx
            className="bg-white mb-4 px-6 py-2 sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300"
            foot={<div>{lastModified}</div>}
          >
            {body}
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
                  {idx === 0 ? (
                    <ButtonBase
                      className="absolute left-6 bottom-6 bg-blue-400 h-12 w-12 rounded-3xl"
                      aria-label="previous"
                    >
                      <NavigateBeforeOutlined
                        className="text-white text-5xl"
                        onClick={() => navigate(`/${item.slug}`)}
                      />
                    </ButtonBase>
                  ) : (
                    <ButtonBase
                      className="absolute right-6 bottom-6 bg-blue-400 h-12 w-12 rounded-3xl"
                      aria-label="next"
                    >
                      <NavigateNextOutlined
                        className="text-white text-5xl"
                        onClick={() => navigate(`/${item.slug}`)}
                      />
                    </ButtonBase>
                  )}
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
                <aside
                  id="mdx-toc"
                  className="-ml-8 pr-4 max-h-screen-3/4 overflow-y-auto"
                >
                  {TOC(((tableOfContents as unknown) as TocItem)?.items ?? [])}
                </aside>
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
      fields {
        lastModified(formatString: "MMMM Do YYYY, h:mm:ss a")
      }
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
