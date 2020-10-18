import { BlogsLayout, Mdx } from "../components";
import type { PageProps } from "gatsby";
import React from "react";
import classes from "../styles/blogs.module.scss";
import { graphql } from "gatsby";

export default function App({
  data: { mdx },
}: PageProps<GatsbyTypes.BlogsTemplatesQuery>) {
  return (
    <BlogsLayout>
      <div className={classes.container}>
        <Mdx>{mdx?.body ?? ""}</Mdx>
      </div>
    </BlogsLayout>
  );
}

export const query = graphql`
  query BlogsTemplates($id: String!) {
    mdx(id: { eq: $id }) {
      body
    }
  }
`;
