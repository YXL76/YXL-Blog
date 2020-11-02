module.exports = {
  plugins: [
    "gatsby-plugin-ts-config",
    { resolve: "gatsby-transformer-sharp", options: { useMozJpeg: true } },
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
  ],
};
