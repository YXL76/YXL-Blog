import { BlogCardSmall, CategoryBanner, SEO } from "../components";
import React, { useMemo } from "react";
import type { CategoriesValue } from "../../config";
import type { ISharpGatsbyImageData } from "gatsby-plugin-image";
import type { PageProps } from "gatsby";

const Category = ({
  location: { href, pathname },
  pageContext: { name, description, caption, image, nodes },
}: PageProps<
  null,
  {
    name: string;
    description: string;
    caption: CategoriesValue;
    image: ISharpGatsbyImageData;
    nodes: ReadonlyArray<GatsbyTypes.Mdx>;
  }
>) => (
  <SEO href={href} pathname={pathname} title={name} image={caption?.href}>
    <CategoryBanner
      image={image}
      category={name}
      description={description}
      caption={caption}
    />
    {useMemo(
      () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
          {nodes.map(
            ({ fields, frontmatter, excerpt, wordCount, timeToRead }, idx) => (
              <div key={idx}>
                <BlogCardSmall
                  image={
                    (frontmatter?.banner?.childImageSharp?.gatsbyImage
                      ?.imageData as unknown) as ISharpGatsbyImageData
                  }
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
      ),
      [nodes]
    )}
  </SEO>
);

export default Category;
