import { BlogCardSmall, Layout, useScrollTrigger } from "../components";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";

export default function App({
  location: { href, origin },
  pageContext: { tag },
  data: { allMdx },
}: PageProps<GatsbyTypes.TagTemplateQuery, { tag: string }>) {
  const trigger = useScrollTrigger();

  return (
    <Layout href={href} origin={origin} title={tag} trigger={trigger}>
      {allMdx?.nodes && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
          {allMdx.nodes.map(
            ({ frontmatter, excerpt, slug, wordCount, timeToRead }, idx) =>
              frontmatter?.banner?.childImageSharp?.fluid && (
                <BlogCardSmall
                  key={idx}
                  img={frontmatter.banner.childImageSharp.fluid}
                  title={frontmatter?.title}
                  subtitle={frontmatter?.subtitle}
                  description={excerpt}
                  date={frontmatter?.date}
                  words={wordCount?.words}
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
  query TagTemplate($tag: [String]!) {
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" } }
        frontmatter: { tags: { in: $tag } }
      }
      sort: { order: DESC, fields: frontmatter___date }
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
