/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

const { basename, dirname, resolve } = require("path");

exports.onCreateNode = ({ node, actions: { createNodeField } }) => {
  try {
    if (node.internal.type === "Mdx") {
      const { fileAbsolutePath } = node;
      createNodeField({
        node,
        name: "contentType",
        value: basename(dirname(fileAbsolutePath)),
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
        allMdx: { nodes },
      },
    } = await graphql(
      `
        {
          allMdx(filter: { fields: { contentType: { eq: "blogs" } } }) {
            nodes {
              id
              slug
            }
          }
        }
      `
    );
    if (errors) {
      throw errors;
    }

    nodes.forEach(({ id, slug }) => {
      createPage({
        path: `/blogs/${slug}`,
        component: resolve(`src/templates/blogs.tsx`),
        context: { id },
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
          allMdx(filter: { fields: { contentType: { eq: "authors" } } }) {
            nodes {
              id
              slug
            }
          }
        }
      `
    );
    if (errors) {
      throw errors;
    }

    nodes.forEach(({ id, slug }) => {
      createPage({
        path: `/authors/${slug}`,
        component: resolve(`src/templates/authors.tsx`),
        context: { id },
      });
    });
  } catch (err) {
    throw err;
  }
};
