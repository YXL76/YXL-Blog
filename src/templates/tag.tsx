import { BlogCardSmall, SEO } from "../components";
import React, { useMemo } from "react";
import type { PageProps } from "gatsby";

const Tag = ({
  location: { href, pathname },
  pageContext: { name, nodes },
}: PageProps<null, { name: string } & GatsbyTypes.MdxConnection>) => (
  <SEO
    href={href}
    pathname={pathname}
    title={name}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8"
  >
    {useMemo(
      () =>
        nodes.map(
          ({ fields, frontmatter, excerpt, wordCount, timeToRead }, idx) =>
            frontmatter?.banner?.childImageSharp?.fluid && (
              <div key={idx}>
                <BlogCardSmall
                  img={frontmatter.banner.childImageSharp.fluid}
                  title={frontmatter?.title}
                  subtitle={frontmatter?.subtitle}
                  description={excerpt}
                  date={frontmatter?.date}
                  words={wordCount?.words}
                  timeToRead={timeToRead}
                  slug={fields?.slug}
                />
              </div>
            )
        ),
      [nodes]
    )}
  </SEO>
);

export default Tag;
