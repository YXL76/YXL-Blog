import { languages, siteMetadata } from ".";
import { message, messageCategories } from "../src/i18n";
import type { Languages } from "./i18n";

interface ItemOptions {
  title: string;
  description: string;
  url: string;
  guid?: string;
  categories?: string[];
  author?: string;
  date: Date | string;
  lat?: number;
  long?: number;
  custom_elements?: any[];
  enclosure?: EnclosureObject;
}

interface EnclosureObject {
  url: string;
  file?: string;
  size?: number;
  type?: string;
}

type Feeds = {
  serialize: (data: { query: GatsbyTypes.Query }) => ItemOptions[];
  query: string;
  output: string;
  title: string;
  match: string;
}[];

const feeds: Feeds = Object.keys(languages).map((language) => ({
  serialize: ({
    query: {
      allMdx: { nodes },
    },
  }) =>
    nodes.map(({ fields, frontmatter, excerpt }) => ({
      title: frontmatter?.title || "",
      description: excerpt,
      url: `${siteMetadata.siteUrl}${fields?.slug || ""}`,
      guid: `${siteMetadata.siteUrl}${fields?.slug || ""}-${
        fields?.lastModified || ""
      }`,
      date: frontmatter?.date || "",
      author: siteMetadata.author.name,
      categories: [
        messageCategories[language as Languages][frontmatter?.category || ""]
          .name,
      ].concat(fields?.tags?.map((tag) => tag?.name || "") || []),
    })),
  query: `{
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" },
        language: { eq: "${language}" } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      nodes {
        fields {
          slug
          tags
          category
          lastModified
        }
        frontmatter {
          title
          date
        }
        excerpt
      }
    }
  }`,
  output: `/${language}/rss.xml`,
  title: message[language as Languages]["title"],
  match: `^/${language}/blogs/`,
}));

export const feed = {
  resolve: "gatsby-plugin-feed",
  options: {
    query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
    feeds,
  },
};
