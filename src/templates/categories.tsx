import { CategoryCard, SEO } from "../components";
import type { FluidObject } from "gatsby-image";
import type { PageProps } from "gatsby";
import React from "react";

export default function App({
  location: { href, pathname },
  pageContext: { categories },
}: PageProps<
  null,
  {
    categories: {
      category: string;
      fluid: FluidObject;
      totalCount: number;
    }[];
  }
>) {
  return (
    <SEO
      href={href}
      pathname={pathname}
      title="Categories"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12"
    >
      {categories.map(({ category, fluid, totalCount }, idx) => (
        <div key={idx}>
          <CategoryCard
            img={fluid}
            title={category}
            description={""}
            totalCount={totalCount}
          />
        </div>
      ))}
    </SEO>
  );
}
