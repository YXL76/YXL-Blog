import {
  BlogCardSmall,
  CategoryBanner,
  Layout,
  useScrollTrigger,
} from "../components";
import type { FluidObject } from "gatsby-image";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";

export default function App({
  location: { href, origin },
  pageContext: { name, description, banner, caption, src },
  data: { allMdx },
}: PageProps<
  GatsbyTypes.CategoryTemplateQuery,
  {
    name: string;
    description: string;
    banner: FluidObject;
    caption?: Record<string, unknown>;
    src: string;
  }
>) {
  const trigger = useScrollTrigger();

  return (
    <Layout
      href={href}
      origin={origin}
      title={name}
      trigger={trigger}
      image={src}
    >
      <CategoryBanner
        img={banner}
        category={name}
        description={description}
        caption={caption}
      />
      {allMdx?.nodes && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12 mt-8">
          {allMdx.nodes.map(
            ({ frontmatter, excerpt, slug, wordCount, timeToRead }, idx) =>
              frontmatter?.banner?.childImageSharp?.fluid && (
                <div>
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
                </div>
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
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        frontmatter {
          banner {
            childImageSharp {
              original {
                src
              }
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
