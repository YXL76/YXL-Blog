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

export const feed = {
  resolve: "gatsby-plugin-feed",
  options: {
    query: `
          {
            site {
              siteMetadata {
                author {
                  name
                }
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
    feeds: [
      {
        serialize: ({
          query: {
            site: { siteMetadata },
            allMdx: { nodes },
          },
        }: {
          query: {
            site: {
              siteMetadata: {
                author: {
                  name: string;
                };
                title: string;
                siteUrl: string;
              };
            };
            allMdx: {
              nodes: {
                fields: {
                  slug: string;
                  lastModified: string;
                };
                frontmatter: {
                  title: string;
                  date: string;
                  category: string;
                  tags: string[];
                };
                excerpt: string;
              }[];
            };
          };
        }): ItemOptions[] => {
          return nodes.map(
            ({
              fields: { slug, lastModified },
              frontmatter: { title, date, category, tags },
              excerpt,
            }) => ({
              title,
              description: excerpt,
              url: `${siteMetadata.siteUrl}${slug}`,
              guid: `${siteMetadata.siteUrl}${slug}-${lastModified}`,
              date,
              author: siteMetadata.author.name,
              categories: [category].concat(tags),
            })
          );
        },
        query: `
              {
                allMdx(
                  filter: { fields: { contentType: { eq: "blogs" } } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    fields {
                      slug
                      lastModified
                    }
                    frontmatter {
                      title
                      date
                      category
                      tags
                    }
                    excerpt
                  }
                }
              }
            `,
        output: "/rss.xml",
        title: "YXL的小屋 RSS Feed",
        match: "^/blogs/",
      },
    ],
  },
};
