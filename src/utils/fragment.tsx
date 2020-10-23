import { graphql } from "gatsby";

export const AuthorQuery = graphql`
  fragment AuthorFrontmatter on Mdx {
    frontmatter {
      name
      avatar {
        publicURL
      }
      role
      bio
      interests
      education {
        course
        date
        institution
      }
      social {
        link
        type
      }
    }
  }
`;

export const BlogQuery = graphql`
  fragment BlogFrontmatter on Mdx {
    frontmatter {
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
`;
