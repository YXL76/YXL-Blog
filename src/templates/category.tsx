import {
  BlogCardSmall,
  CategoryBanner,
  Layout,
  useScrollTrigger,
} from "../components";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";

export default function App({
  pageContext: { name, description, banner, caption },
  data: { allMdx },
}: PageProps<GatsbyTypes.CategoriesTemplatesQuery>) {
  const trigger = useScrollTrigger();

  return (
    <Layout title={name} trigger={trigger}>
      {banner && (
        <CategoryBanner
          img={banner}
          category={name}
          description={description}
          caption={caption}
        />
      )}
      {allMdx?.nodes && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
          {allMdx.nodes.map(
            (
              {
                frontmatter: { banner, title, subtitle, date },
                excerpt,
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
                  description={excerpt}
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
  query CategoryTemplate($name: String!) {
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" } }
        frontmatter: { category: { eq: $name } }
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
        excerpt
      }
    }
  }
`;
