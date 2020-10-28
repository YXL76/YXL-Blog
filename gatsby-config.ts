const config = {
  polyfill: false,
  siteMetadata: {
    title: "YXL的小屋",
    description: "请不要忘记，我在这里",
    siteUrl: "https://yxl76.net",
    defaultImage: "/images/background.jpg",
    keywords: ["blog", "computer science"],
    author: {
      name: "YXL",
      avatar: "/images/avatar.jpg",
      role: "Professor of Artificial Intelligence",
      bio:
        "My research interests include distributed robotics, mobile computing and programmable matter.",
      organizations: [
        {
          name: "Stanford University",
          url: "",
        },
      ],
      interests: [
        "Artificial Intelligence",
        "Computational Linguistics",
        "Information Retrieval",
      ],
      career: [
        {
          position: "planner",
          company: "Baidu",
          date: 2012,
        },
      ],
      education: [
        {
          course: "PhD in Artificial Intelligence",
          institution: "Stanford University",
          date: 2012,
        },
        {
          course: "MEng in Artificial Intelligence",
          institution: "Massachusetts Institute of Technology",
          date: 2009,
        },
        {
          course: "BSc in Artificial Intelligence",
          institution: "Massachusetts Institute of Technology",
          date: 2008,
        },
      ],
      email: "chenxin.lan.76@gmail.com",
      github: "YXL76",
      twitter: "600BpO7CenFdYYg",
      facebook: "chenxin.lan.76",
      instagram: "yxl_76",
      reddit: "YXL_",
      douban: "151739065",
      telegram: "yxl76",
      weibo: "6599959424",
    },
    categories: [
      {
        name: "算法",
        description: "description",
        banner: "images/Categories/算法.jpg",
        caption: {
          children: "keikun_002",
          href: "https://www.pixiv.net/artworks/36661714",
        },
      },
    ],
  },
  plugins: [
    "gatsby-plugin-no-sourcemaps",
    {
      resolve: "gatsby-theme-material-ui",
      options: {
        webFontsConfig: {
          fonts: {},
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "assets/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "content/",
      },
    },
    {
      resolve: "gatsby-transformer-sharp",
      options: {
        useMozJpeg: true,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-remark-images",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        remarkPlugins: [require("remark-math"), require("remark-emoji")],
        rehypePlugins: [
          require("rehype-katex"),
          require("rehype-slug"),
          require("@mapbox/rehype-prism"),
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 2560,
            },
          },
        ],
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        emitSchema: {
          "src/__generated__/gatsby-introspection.json": true,
        },
      },
    },
    "gatsby-plugin-nprogress",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-V354BL9JYX"],
        gtagConfig: {
          anonymize_ip: true,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
    "gatsby-plugin-remove-trailing-slashes",
    {
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
                    html: string;
                  }[];
                };
              };
            }): ItemOptions[] => {
              return nodes.map(
                ({
                  fields: { slug, lastModified },
                  frontmatter: { title, date, category, tags },
                  excerpt,
                  html,
                }) => ({
                  title,
                  description: excerpt,
                  url: `${siteMetadata.siteUrl}${slug}`,
                  guid: `${siteMetadata.siteUrl}${slug}-${lastModified}`,
                  date,
                  author: siteMetadata.author.name,
                  categories: [category].concat(tags),
                  custom_elements: [{ "content:encoded": html }],
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
                    html
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
    },
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "assets/images/icon.svg",
        cache_busting_mode: "none",
        name: "YXL Blog",
        short_name: "YXL Blog",
        description: "YXL Blog",
        start_url: "/",
        background_color: "#fafafa",
        theme_color: "#556cd6",
        display: "standalone",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: ["**/icon*"],
        },
      },
    },
    "gatsby-plugin-netlify",
  ],
};

export default config;

interface ItemOptions {
  /**
   * Title of this particular item.
   */
  title: string;
  /**
   * Content for the item. Can contain HTML but link and image
   * URLs must be absolute path including hostname.
   */
  description: string;
  /**
   * URL to the item. This could be a blog entry.
   */
  url: string;
  /**
   * A unique string feed readers use to know if an item is
   * new or has already been seen. If you use a guid never
   * change it. If you don't provide a guid then your item
   * urls must be unique.
   * Defaults to url.
   */
  guid?: string;
  /**
   * If provided, each array item will be added as a category
   * element.
   */
  categories?: string[];
  /**
   * If included it is the name of the item's creator. If not
   * provided the item author will be the same as the feed author.
   * This is typical except on multi-author blogs.
   */
  author?: string;
  /**
   * The date and time of when the item was created. Feed
   * readers use this to determine the sort order. Some readers
   * will also use it to determine if the content should be
   * presented as unread.
   * Accepts Date object or string with any format
   * JS Date can parse.
   */
  date: Date | string;
  /**
   * The latitude coordinate of the item for GeoRSS.
   */
  lat?: number;
  /**
   * The longitude coordinate of the item for GeoRSS.
   */
  long?: number;
  /**
   * Put additional elements in the item (node-xml syntax).
   */
  custom_elements?: any[];
  /**
   * An enclosure object.
   */
  enclosure?: EnclosureObject;
}

interface EnclosureObject {
  /**
   * URL to file object (or file).
   */
  url: string;
  /**
   * Path to binary file (or URL).
   */
  file?: string;
  /**
   * Size of the file.
   */
  size?: number;
  /**
   * If not provided, the MIME Type will be guessed based
   * on the extension of the file or URL, passing type to
   * the enclosure will override the guessed type.
   */
  type?: string;
}
