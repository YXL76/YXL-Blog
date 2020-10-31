import React, { useEffect, useMemo } from "react";
import { languages, siteMetadata } from "../../config";
import type { FC } from "react";
import { Helmet } from "react-helmet";
import type { Languages } from "../../config";
import { message } from "../i18n";
import { useLocateContext } from "../utils";

type SEOProps = {
  title: string;
  description?: string;
  href: string;
  pathname: string;
  image?: string;
  className?: string;
};

const {
  author: { name, twitter },
  keywords,
  defaultImage,
} = siteMetadata;

const reg = new RegExp("^\\/((?:[^/]+))(\\/.*)");

export const SEO: FC<SEOProps> = ({
  children,
  title,
  description,
  href,
  pathname,
  image,
  className,
}) => {
  const { locate, setLocate } = useLocateContext();

  useEffect(() => {
    const match = reg.exec(pathname.endsWith("/") ? pathname : `${pathname}/`);
    if (
      match?.length === 3 &&
      match[1] !== locate &&
      Object.keys(languages).includes(match[1])
    ) {
      setLocate(match[1] as Languages);
    }
  }, [locate, pathname, setLocate]);

  const { desc, img } = useMemo(
    () => ({
      desc: description || message[locate]["description"],
      img: image || defaultImage,
    }),
    [description, image, locate]
  );

  return (
    <>
      <Helmet
        defer={false}
        htmlAttributes={{ lang: locate }}
        title={title}
        defaultTitle={message[locate]["title"]}
        titleTemplate={`%s | ${message[locate]["title"]}`}
        meta={[
          { charSet: "utf-8" },
          { name: "description", content: desc },
          { name: "author", content: name },
          { name: "keywords", content: keywords.join(",") },
          { name: "twitter:card", content: "summary_large_image" },
          { name: "twitter:site", content: `@${twitter}` },
          { name: "twitter:creator", content: `@${twitter}` },
          { name: "twitter:title", content: title },
          { name: "twitter:description", content: desc },
          { name: "twitter:image", content: img },
          { property: "og:url", content: href },
          { property: "og:title", content: title },
          { property: "og:description", content: desc },
          { property: "og:image", content: img },
          { property: "og:type", content: "website" },
        ]}
      />
      <div className={`w-full ${className || ""}`}>{children}</div>
    </>
  );
};
