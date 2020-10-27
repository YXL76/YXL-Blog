import { CategoryCard, Layout, useScrollTrigger } from "../components";
import type { FluidObject } from "gatsby-image";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";

export default function App({
  location: { href, origin },
  pageContext: { categories },
  data: { allMdx },
}: PageProps<
  GatsbyTypes.CategoriesTemplateQuery,
  { categories: { name: string; description: string; fluid: FluidObject }[] }
>) {
  const trigger = useScrollTrigger();

  return (
    <Layout href={href} origin={origin} title="Categories" trigger={trigger}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
        {allMdx?.group?.map(({ fieldValue, totalCount }, idx) => {
          const item = categories.find(({ name }) => name === fieldValue);
          return (
            item && (
              <CategoryCard
                key={idx}
                img={item.fluid}
                title={fieldValue ?? ""}
                description={item.description}
                totalCount={totalCount}
              />
            )
          );
        })}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query CategoriesTemplate {
    allMdx(
      filter: { fields: { contentType: { eq: "blogs" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`;
