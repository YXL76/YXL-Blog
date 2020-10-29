import { AuthorCard, Layout, Mdx, useScrollTrigger } from "../components";
import React, { useContext } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { DarkModeContext } from "../utils";
import type { PageProps } from "gatsby";

export default function App({ location: { href, origin } }: PageProps) {
  const { mdx } = useStaticQuery<GatsbyTypes.AuthorsPageQuery>(graphql`
    query AuthorsPage {
      mdx(fields: { contentType: { eq: "author" } }) {
        body
      }
    }
  `);

  const body = mdx?.body || "";

  const { darkMode } = useContext(DarkModeContext);
  const trigger = useScrollTrigger();

  return (
    <Layout
      href={href}
      origin={origin}
      title="About"
      trigger={trigger}
      className="group flex flex-col md:flex-row bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in"
    >
      <AuthorCard
        className={`max-w-full md:max-w-sm ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        }`}
      />
      <Mdx className="w-full p-6">{body}</Mdx>
    </Layout>
  );
}
