import { CategoryCard, Layout, useScrollTrigger } from "../components";
import { graphql } from "gatsby";

export default function App({ pageContext: { categories }, data: { allMdx } }) {
  const trigger = useScrollTrigger();

  return (
    <Layout title="Categories" trigger={trigger}>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
        {allMdx?.group?.map(({ fieldValue, totalCount }, idx) => {
          const { description, fluid } = categories.find(
            (item) => item?.name === fieldValue
          );
          return (
            fluid && (
              <CategoryCard
                key={idx}
                img={fluid}
                title={fieldValue}
                description={description}
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
