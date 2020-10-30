import {
  BlogCardSmall,
  CategoryBanner,
  Layout,
  useScrollTrigger,
} from "../components";
import type { CategoriesValue } from "../../config";
import type { FluidObject } from "gatsby-image";
import type { PageProps } from "gatsby";
import React from "react";

export default function App({
  location,
  pageContext: { category, caption, fluid, nodes },
}: PageProps<
  null,
  {
    category: string;
    caption: CategoriesValue;
    fluid: FluidObject;
    nodes: ReadonlyArray<GatsbyTypes.Mdx>;
  }
>) {
  const trigger = useScrollTrigger();

  return (
    <Layout
      {...location}
      title={category}
      trigger={trigger}
      image={caption?.href}
    >
      <CategoryBanner
        img={fluid}
        category={category}
        description={""}
        caption={caption}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
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
      </div>
    </Layout>
  );
}
