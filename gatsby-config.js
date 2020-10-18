module.exports = {
  polyfill: false,
  siteMetadata: {
    title: "YXL Blog",
  },
  plugins: [
    "gatsby-theme-material-ui",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        useResolveUrlLoader: true,
      },
    },
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        emitSchema: {
          "src/__generated__/gatsby-introspection.json": true,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "static/images/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "authors",
        path: "content/authors/",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blogs",
        path: "content/blogs/",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-remark-images",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        remarkPlugins: [require("remark-emoji")],
        rehypePlugins: [
          require("rehype-slug"),
          [require("rehype-autolink-headings"), { behavior: "wrap" }],
          require("@mapbox/rehype-prism"),
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        content: ["**/!(*.d).{ts,js,jsx,tsx,md,mdx}"],
        printRejected: true,
      },
    },
  ],
};
