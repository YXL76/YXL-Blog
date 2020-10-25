import type { FC } from "react";
import { Helmet } from "react-helmet";

type SEOProps = {
  lang?: string;
  title: string;
  siteTitle: string;
  description: string;
};

export const SEO: FC<SEOProps> = ({ lang, title, siteTitle, description }) => (
  <Helmet
    defer={false}
    htmlAttributes={{
      lang: lang ?? "en",
    }}
    title={title}
    defaultTitle={title}
    titleTemplate={`%s | ${siteTitle}`}
    meta={[
      {
        charSet: "utf-8",
      },
      {
        name: "description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:type",
        content: "website",
      },
    ]}
  />
);
