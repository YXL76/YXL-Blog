import { BlogsLayout, Mdx } from "../components";
import type { PageProps } from "gatsby";
import React from "react";
import { graphql } from "gatsby";

export default function App({
  data: { mdx },
}: PageProps<GatsbyTypes.BlogsTemplatesQuery>) {
  return (
    <BlogsLayout>
      <div className="bg-white px-6 py-2 rounded-3xl">
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
