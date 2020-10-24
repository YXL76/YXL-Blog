import { CategoryCard, Layout, useScrollTrigger } from "../components";
import { graphql, useStaticQuery } from "gatsby";

export default function App() {
  const {
    allMdx: { group },
    mdx: {
      frontmatter: { categories },
    },
  } = useStaticQuery<GatsbyTypes.CategoriesPagesQuery>(graphql`
    query CategoriesPages {
      allMdx(
        filter: { fields: { contentType: { eq: "blogs" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        group(field: frontmatter___category) {
          fieldValue
          totalCount
        }
      }
      mdx(fields: { contentType: { eq: "categories" } }) {
        frontmatter {
          categories {
            banner {
              childImageSharp {
                fluid(maxWidth: 1280, maxHeight: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            description
            name
          }
        }
      }
    }
  `);

  const trigger = useScrollTrigger();

  return (
    <Layout trigger={trigger}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
        {group.map(({ fieldValue, totalCount }, idx) => {
          const {
            description,
            banner: {
              childImageSharp: { fluid },
            },
          } = categories.find(({ name }) => name === fieldValue);
          return (
            <CategoryCard
              key={idx}
              img={fluid}
              title={fieldValue}
              description={description}
              totalCount={totalCount}
            />
          );
        })}
      </div>
    </Layout>
  );
}
