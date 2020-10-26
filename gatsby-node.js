/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

const { basename, dirname, parse, resolve } = require("path");
const slugify = require("slugify");

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  try {
    if (node.internal.type === "Mdx") {
      const { fileAbsolutePath } = node;
      const base = basename(dirname(fileAbsolutePath));
      createNodeField({
        node,
        name: "contentType",
        value: base !== "content" ? base : parse(fileAbsolutePath).name,
      });
    }
  } catch (err) {
    throw err;
  }
};

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  try {
    const {
      errors,
      data: {
        allMdx: { edges },
      },
    } = await graphql(
      `
        {
          allMdx(
            filter: { fields: { contentType: { eq: "blogs" } } }
            sort: { order: ASC, fields: frontmatter___date }
          ) {
            edges {
              next {
                id
              }
              node {
                slug
                id
              }
              previous {
                id
              }
            }
          }
        }
      `
    );
    if (errors) {
      throw errors;
    }

    edges.forEach(({ next, node: { id, slug }, previous }) => {
      createPage({
        path: `/${slug}`,
        component: resolve(`src/templates/blogs.tsx`),
        context: {
          id,
          next: next ? next.id : "",
          previous: previous ? previous.id : "",
        },
      });
    });
  } catch (err) {
    throw err;
  }

  try {
    const {
      errors,
      data: {
        allMdx: { group },
      },
    } = await graphql(
      `
        {
          allMdx(
            filter: { fields: { contentType: { eq: "blogs" } } }
            sort: { fields: frontmatter___date, order: DESC }
          ) {
            group(field: frontmatter___category) {
              fieldValue
            }
          }
        }
      `
    );
    if (errors) {
      throw errors;
    }

    group.forEach(({ fieldValue }) => {
      createPage({
        path: `/categories/${slugify(fieldValue)}`,
        component: resolve(`src/templates/categories.tsx`),
        context: {
          category: fieldValue,
        },
      });
    });
  } catch (err) {
    throw err;
  }

  try {
    const {
      errors,
      data: {
        allMdx: { nodes },
      },
    } = await graphql(
      `
        {
          allMdx(
            filter: { fields: { contentType: { eq: "blogs" } } }
            sort: { fields: frontmatter___date, order: DESC }
          ) {
            nodes {
              frontmatter {
                tags
              }
            }
          }
        }
      `
    );
    if (errors) {
      throw errors;
    }

    const data = [];

    nodes.forEach(({ frontmatter: { tags } }) => {
      if (tags) {
        for (const tag of tags) {
          if (!data.includes(tag)) {
            data.push(tag);
          }
        }
      }
    });

    data.forEach((tag) => {
      createPage({
        path: `/tags/${slugify(tag)}`,
        component: resolve(`src/templates/tags.tsx`),
        context: {
          tag: tag,
        },
      });
    });
  } catch (err) {
    throw err;
  }
};
