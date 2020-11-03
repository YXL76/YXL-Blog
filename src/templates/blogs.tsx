import { AuthorCard, BlogCard, Card, Grid, Hidden, SEO } from "../components";
import React, { useMemo } from "react";
import type { PageProps } from "gatsby";
import { useScrollContext } from "../utils";

const Blogs = ({
  location: { href, pathname },
  pageContext: { title, nodes },
}: PageProps<null, { title: string } & GatsbyTypes.MdxConnection>) => {
  const { trigger } = useScrollContext();
  return (
    <SEO href={href} pathname={pathname} title={title}>
      <Grid container>
        {useMemo(
          () => (
            <Grid item xs zeroMinWidth>
              {nodes.map(
                (
                  { fields, frontmatter, excerpt, timeToRead, wordCount },
                  idx
                ) => (
                  <BlogCard
                    key={idx}
                    fluid={frontmatter?.banner?.childImageSharp?.fluid}
                    category={frontmatter?.category || ""}
                    date={frontmatter?.date}
                    subtitle={frontmatter?.subtitle}
                    tags={fields?.tags || []}
                    title={frontmatter?.title}
                    excerpt={excerpt}
                    slug={fields?.slug}
                    timeToRead={timeToRead}
                    words={wordCount?.words}
                  />
                )
              )}
            </Grid>
          ),
          [nodes]
        )}
        <Hidden mdDown>
          <Grid item xs={4} className="pl-12">
            <Card
              className={`group sticky top-20 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 transform ease-out ${
                trigger ? "ease-slide-exit -translate-y-14" : ""
              }`}
            >
              <AuthorCard className="max-h-screen-3/4 overflow-y-auto overflow-x-hidden" />
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </SEO>
  );
};

export default Blogs;
