import {
  AuthorCard,
  BlogBanner,
  ButtonBase,
  Card,
  Grid,
  Hidden,
  Mdx,
  Paper,
  SEO,
  TOC,
  Tab,
  TabPanel,
  Tabs,
  navigate,
} from "../components";
import {
  NavigateBeforeOutlined,
  NavigateNextOutlined,
} from "@material-ui/icons";
import React, { useEffect, useMemo, useState } from "react";
import { useLocateContext, useScrollContext } from "../utils";
import type { ChangeEvent } from "react";
import type { FluidObject } from "gatsby-image";
import GitalkComponent from "gitalk/dist/gitalk-component";
import Img from "gatsby-image";
import type { PageProps } from "gatsby";
import type { TocItem } from "../components";
import { gitalkOptions } from "../../config";

const Blog = ({
  location: { href, pathname },
  pageContext: { author, contents, node, next, previous },
}: PageProps<
  null,
  {
    author: string;
    contents: string;
  } & GatsbyTypes.MdxEdge
>) => {
  const {
    body,
    excerpt,
    timeToRead,
    tableOfContents,
    title,
    subtitle,
    category,
    date,
    fluid,
    caption,
    words,
    lastModified,
    tags,
  } = useMemo(() => {
    const {
      body,
      frontmatter,
      fields,
      excerpt,
      timeToRead,
      wordCount,
      tableOfContents,
    } = node || {};
    const { title, subtitle, category, date, banner, caption } =
      frontmatter || {};
    const { words } = wordCount || {};
    const { lastModified, tags } = fields || {};
    return {
      body,
      excerpt,
      timeToRead,
      tableOfContents,
      title,
      subtitle,
      category: category || "",
      date,
      fluid: banner?.childImageSharp?.fluid as FluidObject,
      caption,
      words,
      lastModified,
      tags,
    };
  }, [node]);

  const { locate } = useLocateContext();
  const { trigger } = useScrollContext();
  const [value, setValue] = useState(0);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handler = (entries: IntersectionObserverEntry[]) => {
      if (entries.length === 1 && entries[0].isIntersecting) {
        setActive(entries[0].target.id);
      }
    };
    const observer = new IntersectionObserver(handler, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });
    document
      .querySelectorAll("#mdx-content > h2, #mdx-content > h3")
      .forEach((node) => {
        observer.observe(node);
      });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <SEO
      href={href}
      pathname={pathname}
      title={title || ""}
      description={excerpt}
      image={caption?.href}
    >
      <style>{`#mdx-toc #toc-${active} {color: var(----primary-main); border-color: var(----primary-main);}`}</style>
      {useMemo(
        () => (
          <BlogBanner
            img={fluid}
            category={category}
            title={title}
            subtitle={subtitle}
            tags={tags || []}
            date={date}
            words={words}
            timeToRead={timeToRead}
            caption={caption}
          />
        ),
        [
          caption,
          category,
          date,
          fluid,
          subtitle,
          tags,
          timeToRead,
          title,
          words,
        ]
      )}
      <Grid container className="mt-6">
        <Grid item xs zeroMinWidth>
          {useMemo(
            () => (
              <Mdx
                className="mb-4 overflow-hidden p-6 sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300"
                foot={
                  <div className="my-4 text-base italic underline">
                    Last modified on {lastModified}
                  </div>
                }
              >
                {body}
              </Mdx>
            ),
            [body, lastModified]
          )}
          {useMemo(() => {
            const near = [previous, next] as (null | {
              fields: { slug: string };
              frontmatter: {
                title: string;
                banner: {
                  childImageSharp: { fluid: FluidObject | FluidObject[] };
                };
              };
            })[];
            return (
              <div className="flex justify-between flex-col sm:flex-row">
                {near.map((item, idx) =>
                  item ? (
                    <div
                      key={idx}
                      className="w-full sm:w-15/32 relative my-4 overflow-hidden sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <Img
                        fluid={item.frontmatter.banner.childImageSharp.fluid}
                      />
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
                            onClick={() => navigate(item.fields?.slug || "")}
                          />
                        </ButtonBase>
                      ) : (
                        <ButtonBase
                          className="absolute right-6 bottom-6 bg-blue-400 h-12 w-12 rounded-3xl"
                          aria-label="next"
                        >
                          <NavigateNextOutlined
                            className="text-white text-5xl"
                            onClick={() => navigate(item.fields?.slug || "")}
                          />
                        </ButtonBase>
                      )}
                    </div>
                  ) : (
                    <div key={idx} className="w-full sm:w-15/32" />
                  )
                )}
              </div>
            );
          }, [next, previous])}
          <Paper>
            <GitalkComponent
              options={{
                ...gitalkOptions,
                id: pathname,
                body: `![${title || ""}](${href})`,
                language: locate,
              }}
            />
          </Paper>
        </Grid>
        <Hidden smDown>
          <Grid item xs={4} className="pl-12">
            <Card
              className={`group sticky overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-toc duration-300 ease-out ${
                trigger ? "top-6 ease-slide-exit" : "top-20"
              }`}
            >
              {useMemo(
                () => (
                  <>
                    <Tabs
                      indicatorColor="primary"
                      value={value}
                      onChange={(_event: ChangeEvent<{}>, newValue: number) => {
                        setValue(newValue);
                      }}
                      variant="fullWidth"
                    >
                      <Tab label={contents} />
                      <Tab label={author} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                      <aside
                        id="mdx-toc"
                        className="-ml-8 pr-4 max-h-screen-3/4 overflow-y-auto"
                      >
                        {TOC(
                          ((tableOfContents as unknown) as TocItem)?.items || []
                        )}
                      </aside>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <AuthorCard className="max-h-screen-3/4 overflow-y-auto" />
                    </TabPanel>
                  </>
                ),
                [author, contents, tableOfContents, value]
              )}
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </SEO>
  );
};

export default Blog;
