import { BlogsLayout, Box, Mdx } from "../components";
import type { PageProps } from "gatsby";
import React from "react";
import { graphql } from "gatsby";

export default function App({
  data: { mdx },
}: PageProps<GatsbyTypes.BlogsTemplatesQuery>) {
  return (
    <BlogsLayout>
      <Box bgcolor="#ffffff" px={4} py={2} borderRadius={24}>
        <Mdx>{mdx?.body ?? ""}</Mdx>
      </Box>
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
