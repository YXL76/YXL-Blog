import { AuthorCard, Layout } from "../components";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

export default function App() {
  const {
    allMdx: { nodes },
  } = useStaticQuery<GatsbyTypes.AuthorsPagesQuery>(graphql`
    query AuthorsPages {
      allMdx(
        filter: { fields: { contentType: { eq: "authors" } } }
        sort: { order: ASC, fields: frontmatter___name }
      ) {
        nodes {
          frontmatter {
            avatar {
              publicURL
            }
            name
            role
            bio
          }
          slug
        }
      }
    }
  `);

  return (
    <Layout>
      {nodes.map((node, index) => (
        <AuthorCard key={index} {...node} />
      ))}
    </Layout>
  );
}
