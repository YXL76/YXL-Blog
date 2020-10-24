import { Button, Layout, useScrollTrigger } from "../components";
import { graphql, useStaticQuery } from "gatsby";
import { AssignmentIndOutlined } from "@material-ui/icons";
import Img from "gatsby-image";
import slugify from "slugify";

export default function App() {
  const {
    allMdx: { group },
    mdx: {
      frontmatter: { categories },
    },
  } = useStaticQuery<GatsbyTypes.categoriesPagesQuery>(graphql`
    query categoriesPages {
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
        {group.map(({ fieldValue, totalCount }) => {
          const {
            description,
            banner: {
              childImageSharp: { fluid },
            },
          } = categories.find(({ name }) => name === fieldValue);
          return (
            <div className="px-4 sm:px-0">
              <div className="overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <Img fluid={fluid} />
                <div className="flex flex-col items-center px-4 pt-4 pb-2 text-center">
                  <h2 className="tracking-wider text-3xl">{fieldValue}</h2>
                  <p className="leading-snug tracking-wider text-base">
                    {description}
                  </p>
                  <div className=" w-full border-gray-400 pt-2 border-solid border-0 border-t">
                    <Button
                      startIcon={<AssignmentIndOutlined />}
                      color="primary"
                      to={`/categories/${slugify(fieldValue)}`}
                    >
                      {totalCount} Blogs
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
