import {
  AuthorCard,
  BlogCard,
  Card,
  Grid,
  Hidden,
  Layout,
  useScrollTrigger,
} from "../components";
import type { PageProps } from "gatsby";
import React from "react";

export default function App({
  location,
  pageContext: { nodes },
}: PageProps<null, GatsbyTypes.MdxConnection>) {
  const trigger = useScrollTrigger();

  return (
    <Layout {...location} title="Blogs" trigger={trigger}>
      <Grid container>
        <Grid item xs zeroMinWidth>
          {nodes.map(
            ({ fields, frontmatter, excerpt, timeToRead, wordCount }, idx) => (
              <BlogCard
                key={idx}
                fluid={frontmatter?.banner?.childImageSharp?.fluid}
                category={frontmatter?.category || ""}
                date={frontmatter?.date}
                subtitle={frontmatter?.subtitle}
                tags={frontmatter?.tags || []}
                title={frontmatter?.title}
                excerpt={excerpt}
                slug={fields?.slug}
                timeToRead={timeToRead}
                words={wordCount?.words}
              />
            )
          )}
        </Grid>
        <Hidden smDown>
          <Grid item xs={4} className="pl-12">
            <Card
              className={`group sticky top-20 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 transform ease-out ${
                trigger ? "ease-slide-exit -translate-y-14" : ""
              }`}
            >
              <AuthorCard className="max-h-screen-3/4 overflow-y-auto" />
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </Layout>
  );
}
