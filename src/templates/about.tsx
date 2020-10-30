import { AuthorCard, Mdx, Paper, SEO } from "../components";
import type { PageProps } from "gatsby";
import React from "react";

const About = ({
  location: { href, pathname },
  pageContext: { title, body },
}: PageProps<null, { title: string; body: string }>) => (
  <SEO href={href} pathname={pathname} title={title}>
    <Paper className="group flex flex-col md:flex-row rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in">
      <AuthorCard className="max-w-full md:max-w-sm" />
      <Mdx className="w-full p-6">{body}</Mdx>
    </Paper>
  </SEO>
);

export default About;
