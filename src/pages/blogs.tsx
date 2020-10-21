import { BlogCard, BlogsLayout } from "../components";
import { graphql, useStaticQuery } from "gatsby";

export default function App() {
  const {
    allMdx: { nodes },
  } = useStaticQuery<GatsbyTypes.BlogsPagesQuery>(graphql`
    query BlogsPages {
      allMdx(
        filter: { fields: { contentType: { eq: "blogs" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        nodes {
          frontmatter {
            banner {
              publicURL
            }
            category
            date(fromNow: true)
            description
            subtitle
            tags
            title
          }
          slug
          wordCount {
            words
          }
          timeToRead
        }
      }
    }
  `);

  return (
    <BlogsLayout>
      {nodes.map((node, index) => (
        <BlogCard key={index} {...node} />
      ))}
    </BlogsLayout>
  );
}
