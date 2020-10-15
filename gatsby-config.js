module.exports = {
  siteMetadata: {
    title: "YXL Blog",
  },
  plugins: [
    "gatsby-theme-material-ui",
    {
      resolve: `gatsby-plugin-typegen`,
      options: {
        emitSchema: {
          "src/__generated__/gatsby-introspection.json": true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `static/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `authors`,
        path: `content/authors/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogs`,
        path: `content/blogs/`,
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-mdx",
  ],
};
