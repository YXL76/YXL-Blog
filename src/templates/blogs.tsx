import { BlogsLayout, Mdx } from "../components";
import type { PageProps } from "gatsby";
import React from "react";
import { graphql } from "gatsby";

export default function App({
  data: { mdx },
}: PageProps<GatsbyTypes.BlogsTemplatesQuery>) {
  return (
    <BlogsLayout>
      <Mdx>{mdx?.body ?? ""}</Mdx>
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
