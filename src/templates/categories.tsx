import { CategoryCard, SEO } from "../components";
import React, { useMemo } from "react";
import type { FluidObject } from "gatsby-image";
import type { PageProps } from "gatsby";

const Categories = ({
  location: { href, pathname },
  pageContext: { title, categories },
}: PageProps<
  null,
  {
    title: string;
    categories: {
      category: string;
      name: string;
      description: string;
      fluid: FluidObject;
      totalCount: number;
    }[];
  }
>) => (
  <SEO
    href={href}
    pathname={pathname}
    title={title}
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12"
  >
    {useMemo(
      () =>
        categories.map(
          ({ category, name, description, fluid, totalCount }, idx) => (
            <div key={idx}>
              <CategoryCard
                img={fluid}
                category={category}
                title={name}
                description={description}
                totalCount={totalCount}
              />
            </div>
          )
        ),
      [categories]
    )}
  </SEO>
);

export default Categories;
