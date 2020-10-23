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
        path: `/blogs/${slug}`,
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
};
