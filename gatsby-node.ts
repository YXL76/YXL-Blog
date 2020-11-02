import type { Actions, CreatePagesArgs, GatsbyNode } from "gatsby";
import type { CategoriesValue, Languages } from "./config";
import { basename, dirname, resolve } from "path";
import { categories, languages } from "./config";
import { message, messageCategories, messageTags } from "./src/i18n";
import type { ISharpGatsbyImageData } from "gatsby-plugin-image";
import { createFilePath } from "gatsby-source-filesystem";
import simpleGit from "simple-git";
const git = simpleGit({ baseDir: __dirname });

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  getNode,
  actions: { createNodeField },
}) => {
  if (node.internal.type === "Mdx") {
    const { fileAbsolutePath } = node;
    const slug = createFilePath({ node, getNode }).slice(0, -1);
    const language = (/^\/((?:[^/]+))(\/.*)/.exec(slug) || [])[1] as Languages;
    createNodeField(
      {
        name: "slug",
        node,
        value: slug,
      },
      { name: "gatsby-plugin-mdx" }
    );
    createNodeField(
      {
        node,
        name: "contentType",
        value: basename(dirname(slug)),
      },
      { name: "gatsby-plugin-mdx" }
    );
    createNodeField(
      {
        node,
        name: "language",
        value: language,
      },
      { name: "gatsby-plugin-mdx" }
    );
    createNodeField(
      {
        node,
        name: "lastModified",
        value:
          (await git.log({ file: fileAbsolutePath as string, n: 1 }))?.latest
            ?.date || new Date(),
      },
      { name: "gatsby-plugin-mdx" }
    );
    const tags = ((node as unknown) as GatsbyTypes.Mdx)?.frontmatter?.tags;
    if (tags) {
      createNodeField(
        {
          node,
          name: "tags",
          value: tags.map((tag) =>
            tag ? { tag, name: messageTags[language][tag] } : {}
          ),
        },
        { name: "gatsby-plugin-mdx" }
      );
    }
  }
};

const createIndexPage = (
  language: Languages,
  createPage: Actions["createPage"]
) => {
  createPage({
    path: `/${language}`,
    component: resolve("src/pages/index.tsx"),
    context: {
      home: message[language]["home"],
      title: message[language]["title"],
      description: message[language]["description"],
    },
  });
};

const createAboutPage = async (
  language: Languages,
  graphql: CreatePagesArgs["graphql"],
  createPage: Actions["createPage"]
) => {
  const { data } = await graphql<GatsbyTypes.Query>(`{
    mdx(fields: { contentType: { eq: "author" }, language: { eq: "${language}" } }) {
      body
    }
  }`);
  createPage({
    path: `/${language}/about`,
    component: resolve("src/templates/about.tsx"),
    context: { title: message[language]["about"], body: data?.mdx?.body },
  });
};

const createArchivesPage = async (
  language: Languages,
  graphql: CreatePagesArgs["graphql"],
  createPage: Actions["createPage"]
) => {
  const { data } = await graphql<GatsbyTypes.Query>(`{
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" },
        language: { eq: "${language}" } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      group(field: frontmatter___archive) {
        fieldValue
        nodes {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM/DD", locale: "${language}")
            title
            subtitle
          }
        }
      }
    }
  }`);
  createPage({
    path: `/${language}/archives`,
    component: resolve("src/templates/archives.tsx"),
    context: {
      title: message[language]["archives"],
      group: data?.allMdx?.group,
    },
  });
};

const childImageSharp = (size: string) => `
childImageSharp {
  gatsbyImage(${size}, layout: FLUID, placeholder: BASE64) {
    imageData
  }
}`;

const MdxNodeQuery = (language: Languages, size: string) => `
fields {
  lastModified(formatString: "MMMM Do YYYY h:mm:ss a", locale: "${language}")
  tags {
    tag
    name
  }
  slug
}
frontmatter {
  banner {
    ${childImageSharp(size)}
  }
  caption {
    children
    href
  }
  category
  date(fromNow: true, locale: "${language}")
  subtitle
  title
}
wordCount {
  words
}
timeToRead
excerpt
`;

const createBlogsPage = async (
  language: Languages,
  graphql: CreatePagesArgs["graphql"],
  createPage: Actions["createPage"]
) => {
  const { data } = await graphql<GatsbyTypes.Query>(`{
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" },
        language: { eq: "${language}" } }
      }
      sort: { order: DESC, fields: frontmatter___date }
    ) {
      edges {
        node {
          ${MdxNodeQuery(language, "maxWidth: 2560")}
          body
          tableOfContents(maxDepth: 3)
        }
        next {
          fields {
            slug
          }
          frontmatter {
            banner {
              ${childImageSharp("maxWidth: 1280, maxHeight: 800")}
            }
            title
          }
        }
        previous {
          fields {
            slug
          }
          frontmatter {
            banner {
              ${childImageSharp("maxWidth: 1280, maxHeight: 800")}
            }
            title
          }
        }
      }
    }
  }`);
  createPage({
    path: `/${language}/blogs`,
    component: resolve("src/templates/blogs.tsx"),
    context: {
      title: message[language]["blogs"],
      nodes: data?.allMdx?.edges.map(({ node }) => ({
        ...node,
        body: "",
        tableOfContents: {},
      })),
    },
  });
  data?.allMdx?.edges.forEach((edge) => {
    if (edge.node.fields?.slug) {
      createPage({
        path: edge.node.fields.slug,
        component: resolve("src/templates/blog.tsx"),
        context: {
          contents: message[language]["contents"],
          author: message[language]["author"],
          ...edge,
        },
      });
    }
  });
};

const createTagsPage = async (
  language: Languages,
  graphql: CreatePagesArgs["graphql"],
  createPage: Actions["createPage"]
) => {
  const { data } = await graphql<GatsbyTypes.Query>(`{
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" },
        language: { eq: "${language}" } }
      }
    ) {
      nodes {
        frontmatter {
          tags
        }
      }
    }
  }`);

  const tags: Record<string, { name: string; count: number }> = {};
  data?.allMdx?.nodes?.forEach((node) => {
    for (const tag of node?.frontmatter?.tags || []) {
      if (tag) {
        if (tag in tags) {
          ++tags[tag].count;
        } else {
          tags[tag] = {
            name: messageTags[language][tag],
            count: 1,
          };
        }
      }
    }
  });
  createPage({
    path: `/${language}/tags`,
    component: resolve("src/templates/tags.tsx"),
    context: { title: message[language]["tags"], tags },
  });

  for (const [tag, { name }] of Object.entries(tags)) {
    const { data } = await graphql<GatsbyTypes.Query>(`{
      allMdx(
        filter: {
          fields: { contentType: { eq: "blogs" },
          language: { eq: "${language}" } }
          frontmatter: { tags: { in: "${tag}" } }
        }
      ) {
        nodes {
          ${MdxNodeQuery(language, "maxWidth: 1280, maxHeight: 800")}
        }
      }
    }`);
    createPage({
      path: `/${language}/tags/${tag}`,
      component: resolve("src/templates/tag.tsx"),
      context: { name, nodes: data?.allMdx?.nodes },
    });
  }
};

const createCategoriesPage = async (
  language: Languages,
  graphql: CreatePagesArgs["graphql"],
  createPage: Actions["createPage"]
) => {
  const cats: {
    category: string;
    name: string;
    description: string;
    caption: CategoriesValue;
    small?: ISharpGatsbyImageData;
    big?: ISharpGatsbyImageData;
    nodes?: ReadonlyArray<GatsbyTypes.Mdx>;
  }[] = [];

  for (const [category, caption] of Object.entries(categories)) {
    const { data } = await graphql<GatsbyTypes.Query>(`{
      allMdx(
        filter: {
          fields: { 
            contentType: { eq: "blogs" },
            language: { eq: "${language}" }
          }
          frontmatter: {
            category: { eq: "${category}" }
          }
        }
      ) {
        nodes {
          ${MdxNodeQuery(language, "maxWidth: 2560")}
        }
      }
    }`);

    const small = await graphql<GatsbyTypes.Query>(`{
      file(relativePath: { regex: "/^images\\/categories\\/${category}.(jpg|png|webp)/" }) {
        ${childImageSharp("maxWidth: 1280, maxHeight: 800")}
      }
    }`);

    const big = await graphql<GatsbyTypes.Query>(`{
      file(relativePath: { regex: "/^images\\/categories\\/${category}.(jpg|png|webp)/" }) {
        ${childImageSharp("maxWidth: 2560")}
      }
    }`);

    cats.push({
      category,
      name: messageCategories[language][category].name,
      description: messageCategories[language][category].description,
      caption,
      small: small.data?.file?.childImageSharp?.gatsbyImage?.imageData,
      big: big.data?.file?.childImageSharp?.gatsbyImage?.imageData,
      nodes: data?.allMdx?.nodes,
    });
  }

  createPage({
    path: `/${language}/categories`,
    component: resolve("src/templates/categories.tsx"),
    context: {
      title: message[language]["categories"],
      categories: cats.map(({ category, name, description, small, nodes }) => ({
        category,
        name,
        description,
        image: small,
        totalCount: nodes?.length,
      })),
    },
  });

  cats.forEach(({ category, name, description, caption, big, nodes }) => {
    createPage({
      path: `/${language}/categories/${category}`,
      component: resolve("src/templates/category.tsx"),
      context: { name, description, caption, image: big, nodes },
    });
  });
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  for (const language of Object.keys(languages)) {
    createIndexPage(language as Languages, createPage);
    await createAboutPage(language as Languages, graphql, createPage);
    await createArchivesPage(language as Languages, graphql, createPage);
    await createBlogsPage(language as Languages, graphql, createPage);
    await createTagsPage(language as Languages, graphql, createPage);
    await createCategoriesPage(language as Languages, graphql, createPage);
  }
};
