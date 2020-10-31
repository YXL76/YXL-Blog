import { feed, siteMetadata } from "./config";

const config = {
  polyfill: false,
  siteMetadata,
  plugins: [
    "gatsby-plugin-no-sourcemaps",
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
          { resolve: "gatsby-remark-images", options: { maxWidth: 2560 } },
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
    ...[feed],
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
      options: { workboxConfig: { globPatterns: ["**/icon*"] } },
    },
    "gatsby-plugin-netlify",
  ],
};

export default config;
