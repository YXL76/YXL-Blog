import { CategoryCard, Layout, useScrollTrigger } from "../components";
import type { FluidObject } from "gatsby-image";
import type { PageProps } from "gatsby";
import React from "react";

export default function App({
  location,
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
  const trigger = useScrollTrigger();

  return (
    <Layout
      {...location}
      title="Categories"
      trigger={trigger}
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
    </Layout>
  );
}
