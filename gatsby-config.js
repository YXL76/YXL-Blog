module.exports = {
  polyfill: false,
  siteMetadata: {
    title: "YXL Blog",
    description: "YXL Blog",
    siteUrl: "https://yxl76.net",
    author: {
      name: "YXL",
      avatar: "/images/avatar.png",
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
      github: "https://github.com/YXL76",
    },
    categories: [
      {
        name: "Tech",
        description: "description",
        banner: "images/DgeNbpa.jpg",
        caption: {
          children: "KiTA",
          href:
            "https://www.pixiv.net/member_illust.php?mode=medium&illust_id=62341877",
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
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        emitSchema: {
          "src/__generated__/gatsby-introspection.json": true,
        },
      },
    },
    "gatsby-plugin-sitemap",
    "gatsby-plugin-nprogress",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-V354BL9JYX"],
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
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
    "gatsby-plugin-remove-trailing-slashes",
    "gatsby-plugin-netlify",
  ],
};
