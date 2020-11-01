import { languages } from "./i18n";

type Queries = {
  indexName: string;
  query: string;
  transformer: (_: {
    data: GatsbyTypes.Query;
  }) => ({ objectID?: string } & Record<string, any>)[];
  settings: Record<string, any>;
}[];

const queries: Queries = Object.keys(languages).map((language) => ({
  indexName: language,
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
          lastModified
          slug
        }
        frontmatter {
          title
          subtitle
        }
        excerpt(pruneLength: 5000)
      }
    }
  }`,
  transformer: ({ data }) =>
    data.allMdx.nodes.map(({ fields, frontmatter, excerpt }) => ({
      objectID: fields?.slug,
      ...fields,
      ...frontmatter,
      excerpt,
    })),
  settings: { attributesToSnippet: ["excerpt:20"] },
}));

export const algolia = {
  resolve: "gatsby-plugin-algolia",
  options: {
    appId: process.env.GATSBY_ALGOLIA_APP_ID,
    apiKey: process.env.ALGOLIA_ADMIN_KEY,
    enablePartialUpdates: true,
    matchFields: ["lastModified"],
    chunkSize: 10000,
    concurrentQueries: true,
    queries,
  },
};
