import type { FC } from "react";
import { Helmet } from "react-helmet";
import React from "react";
import { siteMetadata } from "../../config";
import { useLocateContext } from "../utils";

type SEOProps = {
  title: string;
  description?: string;
  href: string;
  image?: string;
};

const {
  author: { name, twitter },
  keywords,
  defaultImage,
} = siteMetadata;

export const SEO: FC<SEOProps> = ({ title, description, href, image }) => {
  const { locate, message } = useLocateContext();

  description = description || message["description"];
  image = image || defaultImage;

  return (
    <Helmet
      defer={false}
      htmlAttributes={{ lang: locate }}
      title={title}
      defaultTitle={message["title"]}
      titleTemplate={`%s | ${message["title"]}`}
      meta={[
        { charSet: "utf-8" },
        { name: "description", content: description },
        { name: "author", content: name },
        { name: "keywords", content: keywords.join(",") },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: `@${twitter}` },
        { name: "twitter:creator", content: `@${twitter}` },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
        { property: "og:url", content: href },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: image },
        { property: "og:type", content: "website" },
      ]}
    />
  );
};
