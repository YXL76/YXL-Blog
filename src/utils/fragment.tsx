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
        twitter
        facebook
        instagram
        reddit
        douban
        telegram
        weibo
      }
    }
  }
`;

export const BlogQuery = graphql`
  fragment BlogFrontmatter on Mdx {
    fields {
      slug
    }
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
    wordCount {
      words
    }
    timeToRead
  }
`;
