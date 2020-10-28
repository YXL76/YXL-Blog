import { Layout, useScrollTrigger } from "../components";
import { graphql, useStaticQuery } from "gatsby";
import type { PageProps } from "gatsby";
import React from "react";

export default function App({ location: { href, origin } }: PageProps) {
  const { site } = useStaticQuery<GatsbyTypes.IndexPageQuery>(graphql`
    query IndexPage {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);
  const { title, description } = site?.siteMetadata ?? {};

  const trigger = useScrollTrigger();

  return (
    <Layout
      href={href}
      origin={origin}
      title="Home"
      trigger={trigger}
      className="flex flex-col items-end pr-4 sm:pr-0"
    >
      <h1 className="text-white text-6xl mt-32">{title}</h1>
      <h2 className="text-white text-2xl mt-8">{description}</h2>
    </Layout>
  );
}
