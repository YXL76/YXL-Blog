import { BlogCard, Grid, Layout } from "../components";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

export default function App() {
  const data = useStaticQuery<GatsbyTypes.BlogsQuery>(graphql`
    query Blogs {
      allMdx(filter: {}) {
        nodes {
          frontmatter {
            title
          }
          wordCount {
            words
          }
          timeToRead
        }
      }
    }
  `);

  return (
    <Layout>
      <Grid container>
        <Grid item xs={8}>
          {data.allMdx.nodes.map(
            (
              { frontmatter: { title }, timeToRead, wordCount: { words } },
              index
            ) => (
              <BlogCard
                key={index}
                title={title}
                words={words}
                timeToRead={timeToRead}
              />
            )
          )}
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Layout>
  );
}
