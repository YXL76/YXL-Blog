import { graphql } from "gatsby";

export const AuthorQuery = graphql`
  fragment AuthorFrontmatter on Site {
    siteMetadata {
      author {
        name
        avatar
        role
        bio
        email
        github
      }
    }
  }
`;

export const BlogQuery = graphql`
  fragment BlogFrontmatter on Mdx {
    frontmatter {
      caption {
        children
        href
      }
      category
      date(fromNow: true)
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
