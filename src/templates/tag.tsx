import { BlogCardSmall, SEO } from "../components";
import type { PageProps } from "gatsby";
import React from "react";

export default function App({
  location: { href, pathname },
  pageContext: { tag, nodes },
}: PageProps<null, { tag: string } & GatsbyTypes.MdxConnection>) {
  return (
    <SEO
      href={href}
      pathname={pathname}
      title={tag}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8"
    >
      {nodes.map(
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
      )}
    </SEO>
  );
}
