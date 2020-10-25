module.exports = {
  polyfill: false,
  siteMetadata: {
    title: "YXL Blog",
    description: "YXL Blog",
    siteUrl: "https://agitated-brown-2ed627.netlify.app/",
  },
  plugins: [
    {
      resolve: "gatsby-theme-material-ui",
      options: {
        webFontsConfig: {
          fonts: {},
        },
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
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-remark-images",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        remarkPlugins: [require("remark-emoji")],
        rehypePlugins: [
          require("rehype-slug"),
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
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "assets/images/icon.svg",
        cache_busting_mode: "none",
        name: "YXL Blog",
        short_name: "YXL Blog",
        description: "",
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
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "250334470",
        head: false,
        anonymize: true,
        respectDNT: true,
        pageTransitionDelay: 0,
        defer: false,
      },
    },
  ],
};
