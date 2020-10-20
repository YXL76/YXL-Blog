module.exports = {
  polyfill: false,
  siteMetadata: {
    title: "YXL Blog",
  },
  plugins: [
    "gatsby-theme-material-ui",
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        emitSchema: {
          "src/__generated__/gatsby-schema.graphql": true,
        },
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "assets/images/",
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
              maxWidth: 2560,
              sizeByPixelDensity: true,
            },
          },
        ],
      },
    },
    "gatsby-plugin-postcss",
  ],
};