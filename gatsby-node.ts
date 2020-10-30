import type { Actions, CreatePagesArgs, GatsbyNode } from "gatsby";
import { basename, dirname, resolve } from "path";
import { categories, languages } from "./config";
import type { CategoriesValue } from "./config";
import type { FluidObject } from "gatsby-image";
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
        value: (/^\/((?:[^/]+))(\/.*)/.exec(slug) || [])[1],
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
  }
};

const createAboutPage = async (
  language: string,
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
    context: { body: data?.mdx?.body },
  });
};

const createArchivesPage = async (
  language: string,
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
            date(formatString: "MM/DD")
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
    context: { group: data?.allMdx?.group },
  });
};

const GatsbyImageSharpFluid = `
base64
aspectRatio
src
srcSet
sizes
`;

const MdxNodeQuery = (fluid: string) => `
fields {
  lastModified(formatString: "MMMM Do YYYY h:mm:ss a")
  slug
}
frontmatter {
  banner {
    childImageSharp {
      fluid(${fluid}) {
        ${GatsbyImageSharpFluid}
      }
    }
  }
  caption {
    children
    href
  }
  category
  date(fromNow: true)
  subtitle
  tags
  title
}
wordCount {
  words
}
timeToRead
excerpt
`;

const createBlogsPage = async (
  language: string,
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
          ${MdxNodeQuery("maxWidth: 2560")}
          body
          tableOfContents(maxDepth: 3)
        }
        next {
          fields {
            slug
          }
          frontmatter {
            banner {
              childImageSharp {
                fluid(maxWidth: 1280, maxHeight: 800) {
                  ${GatsbyImageSharpFluid}
                }
              }
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
              childImageSharp {
                fluid(maxWidth: 1280, maxHeight: 800) {
                  ${GatsbyImageSharpFluid}
                }
              }
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
      nodes: data?.allMdx?.edges.map(({ node }) => ({
        ...node,
        body: "",
        tableOfContents: {},
      })),
    },
  });
  data?.allMdx?.edges.forEach((context) => {
    if (context.node.fields?.slug) {
      createPage({
        path: context.node.fields.slug,
        component: resolve("src/templates/blog.tsx"),
        context,
      });
    }
  });
};

const createTagsPage = async (
  language: string,
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

  const tags: Record<string, number> = {};
  data?.allMdx?.nodes?.forEach((node) => {
    for (const tag of node?.frontmatter?.tags || []) {
      if (tag) {
        tags[tag] = tag in tags ? tags[tag] : 0 + 1;
      }
    }
  });
  createPage({
    path: `/${language}/tags`,
    component: resolve("src/templates/tags.tsx"),
    context: { tags },
  });

  for (const tag of Object.keys(tags)) {
    const { data } = await graphql<GatsbyTypes.Query>(`{
      allMdx(
        filter: {
          fields: { contentType: { eq: "blogs" },
          language: { eq: "${language}" } }
          frontmatter: { tags: { in: "${tag}" } }
        }
      ) {
        nodes {
          ${MdxNodeQuery("maxWidth: 1280, maxHeight: 800")}
        }
      }
    }`);
    createPage({
      path: `/${language}/tags/${tag}`,
      component: resolve("src/templates/tag.tsx"),
      context: { tag, nodes: data?.allMdx?.nodes },
    });
  }
};

const createCategoriesPage = async (
  language: string,
  graphql: CreatePagesArgs["graphql"],
  createPage: Actions["createPage"]
) => {
  const cats: {
    category: string;
    caption: CategoriesValue;
    fluid?: FluidObject;
    nodes?: ReadonlyArray<GatsbyTypes.Mdx>;
  }[] = [];

  for (const [category, caption] of Object.entries(categories)) {
    const { data } = await graphql<GatsbyTypes.Query>(`{
      allMdx(
        filter: {
          fields: { contentType: { eq: "blogs" },
          language: { eq: "${language}" } }
        }
      ) {
        nodes {
          ${MdxNodeQuery("maxWidth: 2560")}
        }
      }
    }`);

    const banner = await graphql<GatsbyTypes.Query>(`{
      file(relativePath: { regex: "/^images\\/categories\\/${category}.(jpg|png)/" }) {
        childImageSharp {
          fluid(maxWidth: 2560) {
            ${GatsbyImageSharpFluid}
          }
        }
      }
    }`);

    cats.push({
      category,
      caption,
      fluid: banner.data?.file?.childImageSharp?.fluid,
      nodes: data?.allMdx?.nodes,
    });
  }

  createPage({
    path: `/${language}/categories`,
    component: resolve("src/templates/categories.tsx"),
    context: {
      categories: cats.map(({ category, fluid, nodes }) => ({
        category,
        fluid,
        totalCount: nodes?.length,
      })),
    },
  });

  cats.forEach(({ category, caption, fluid, nodes }) => {
    createPage({
      path: `/${language}/categories/${category}`,
      component: resolve("src/templates/category.tsx"),
      context: {
        category,
        caption,
        fluid,
        nodes,
      },
    });
  });
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  for (const language of Object.keys(languages)) {
    createPage({
      path: `/${language}`,
      component: resolve("src/pages/index.tsx"),
      context: {},
    });
    await createAboutPage(language, graphql, createPage);
    await createArchivesPage(language, graphql, createPage);
    await createBlogsPage(language, graphql, createPage);
    await createTagsPage(language, graphql, createPage);
    await createCategoriesPage(language, graphql, createPage);
  }
};
