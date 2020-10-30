import { AuthorCard, Mdx, Paper, SEO } from "../components";
import type { PageProps } from "gatsby";
import React from "react";

export default function App({
  location: { href, pathname },
  pageContext: { body },
}: PageProps<null, { body: string }>) {
  return (
    <SEO href={href} pathname={pathname} title="About">
      <Paper className="group flex flex-col md:flex-row rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in">
        <AuthorCard className="max-w-full md:max-w-sm" />
        <Mdx className="w-full p-6">{body}</Mdx>
      </Paper>
    </SEO>
  );
}
