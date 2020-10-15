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
    const blogsPostTemplate = resolve(`src/templates/blogs.tsx`);

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
              slug
            }
          }
        }
      `
    );

    if (errors) {
      throw errors;
    }

    nodes.forEach(({ slug }) => {
      createPage({
        path: `/blogs/${slug}`,
        component: blogsPostTemplate,
        context: {},
      });
    });
  } catch (err) {
    throw err;
  }
};
