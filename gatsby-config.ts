import { algolia, feed, siteMetadata } from "./config";

const config = {
  polyfill: false,
  siteMetadata,
  plugins: [
    "gatsby-plugin-no-sourcemaps",
    "gatsby-plugin-preact",
    {
      resolve: "gatsby-theme-material-ui",
      options: { webFontsConfig: { fonts: {} } },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "assets", path: "assets/" },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "content", path: "content/" },
    },
    { resolve: "gatsby-transformer-sharp", options: { useMozJpeg: true } },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        remarkPlugins: [require("remark-math"), require("remark-emoji")],
        rehypePlugins: [
          require("rehype-katex"),
          require("rehype-slug"),
          require("@mapbox/rehype-prism"),
        ],
      },
    },
    "gatsby-plugin-postcss",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        emitSchema: { "src/__generated__/gatsby-introspection.json": true },
      },
    },
    "gatsby-plugin-nprogress",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-V354BL9JYX"],
        gtagConfig: { anonymize_ip: true },
        pluginConfig: { head: false, respectDNT: true },
      },
    },
    "gatsby-plugin-remove-trailing-slashes",
    algolia,
    feed,
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "assets/images/icon.svg",
        cache_busting_mode: "none",
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        description: siteMetadata.description,
        start_url: "/",
        background_color: "#fff",
        theme_color: "#1e88e5",
        display: "standalone",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: { workboxConfig: { globPatterns: ["**/icon*"] } },
    },
    "gatsby-plugin-netlify",
  ],
};

export default config;
