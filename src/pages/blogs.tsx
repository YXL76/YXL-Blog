import { BlogCard, Grid, Layout } from "../components";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

export default function App() {
  const {
    allMdx: { nodes },
  } = useStaticQuery<GatsbyTypes.BlogsPagesQuery>(graphql`
    query BlogsPages {
      allMdx(
        filter: { fields: { contentType: { eq: "blogs" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        nodes {
          frontmatter {
            banner {
              publicURL
            }
            category
            date(fromNow: true)
            description
            subtitle
            tags
            title
          }
          slug
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
          {nodes.map((node, index) => (
            <BlogCard key={index} {...node} />
          ))}
        </Grid>
        <Grid item xs={4}></Grid>
      </Grid>
    </Layout>
  );
}
