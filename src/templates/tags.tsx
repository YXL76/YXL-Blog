import { BlogCardSmall, Layout, useScrollTrigger } from "../components";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";

export default function App({
  pageContext: { tag },
  data: { allMdx },
}: PageProps<GatsbyTypes.CategoriesTemplatesQuery>) {
  const trigger = useScrollTrigger();

  return (
    <Layout title={tag} trigger={trigger}>
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
  query TagsTemplates($tag: [String]!) {
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" } }
        frontmatter: { tags: { in: $tag } }
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
