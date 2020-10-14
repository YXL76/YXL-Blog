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
          outputPath: "src/__generated__/gatsby-types.d.ts",
          "src/__generated__/gatsby-introspection.json": true,
        },
      },
    },
  ],
};
