import type { FC } from "react";
import { Helmet } from "react-helmet";
import React from "react";

type SEOProps = {
  lang?: string;
  title: string;
  siteTitle: string;
  description: string;
  author: string;
  href: string;
  keywords: readonly (string | undefined)[];
  image: string;
  twitter: string;
};

export const SEO: FC<SEOProps> = ({
  lang,
  title,
  siteTitle,
  description,
  author,
  href,
  keywords,
  image,
  twitter,
}) => (
  <Helmet
    defer={false}
    htmlAttributes={{
      lang: lang ?? "en",
    }}
    title={title}
    defaultTitle={title}
    titleTemplate={`%s | ${siteTitle}`}
    meta={[
      { charSet: "utf-8" },
      { name: "description", content: description },
      { name: "author", content: author },
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
