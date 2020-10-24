import {
  BlogCardSmall,
  CategoryBanner,
  Layout,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  useScrollTrigger,
} from "../components";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";

export default function App({
  data: { allMdx, mdx },
}: PageProps<GatsbyTypes.CategoriesTemplatesQuery>) {
  const { category } = allMdx?.nodes[0]?.frontmatter ?? {};
  const { banner, description, caption } =
    mdx?.frontmatter?.categories?.find(({ name }) => name === category) ?? {};
  const { fluid } = banner?.childImageSharp ?? {};

  const trigger = useScrollTrigger();

  return (
    <Layout trigger={trigger}>
      {fluid && (
        <CategoryBanner
          img={fluid}
          category={category}
          description={description}
          caption={caption}
        />
      )}
      {allMdx?.nodes && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
          {allMdx.nodes.map(
            (
              {
                frontmatter: { banner, title, subtitle, description, date },
                slug,
                wordCount: { words },
                timeToRead,
              },
              idx
            ) =>
              banner?.childImageSharp?.fluid && (
                <BlogCardSmall
                  key={idx}
                  img={banner.childImageSharp.fluid}
                  title={title}
                  subtitle={subtitle}
                  description={description}
                  date={date}
                  words={words}
                  timeToRead={timeToRead}
                  slug={slug}
                />
              )
          )}
        </div>
      )}
    </Layout>
  );
}

export const query = graphql`
  query CategoriesTemplates($category: String!) {
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" } }
        frontmatter: { category: { eq: $category } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          banner {
            childImageSharp {
              fluid(maxWidth: 1280, maxHeight: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        ...BlogFrontmatter
      }
    }
    mdx(fields: { contentType: { eq: "categories" } }) {
      frontmatter {
        categories {
          banner {
            childImageSharp {
              fluid(maxWidth: 2560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          caption {
            children
            href
          }
          description
          name
        }
      }
    }
  }
`;
