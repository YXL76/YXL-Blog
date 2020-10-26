/* eslint-disable @typescript-eslint/no-unsafe-return */
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
        site: {
          siteMetadata: { categories },
        },
        allMdx: { edges },
      },
    } = await graphql(
      `
        {
          site {
            siteMetadata {
              categories {
                caption {
                  children
                  href
                }
                name
                description
                banner
              }
            }
          }
          allMdx(
            filter: { fields: { contentType: { eq: "blogs" } } }
            sort: { order: ASC, fields: frontmatter___date }
          ) {
            edges {
              next {
                id
              }
              node {
                frontmatter {
                  tags
                }
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

    const data = [];

    edges.forEach(
      ({
        next,
        node: {
          frontmatter: { tags },
          id,
          slug,
        },
        previous,
      }) => {
        if (tags) {
          for (const tag of tags) {
            if (!data.includes(tag)) {
              data.push(tag);
            }
          }
        }
        createPage({
          path: `/${slug}`,
          component: resolve(`src/templates/blog.tsx`),
          context: {
            id,
            next: next ? next.id : "",
            previous: previous ? previous.id : "",
          },
        });
      }
    );

    data.forEach((tag) => {
      createPage({
        path: `/tags/${slugify(tag)}`,
        component: resolve(`src/templates/tag.tsx`),
        context: {
          tag: tag,
        },
      });
    });

    const cats = [];

    for (const { name, description, banner, caption } of categories) {
      const {
        errors,
        data: {
          file: {
            childImageSharp: { fluid },
          },
        },
      } = await graphql(
        `
          {
            file(relativePath: { eq: "${banner}" }) {
              childImageSharp {
                fluid(maxWidth: 2560, maxHeight: 1600) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  sizes
                }
              }
            }
          }
        `
      );
      if (errors) {
        throw errors;
      }
      const cat = { name, description, caption, fluid };
      cats.push(cat);
      createPage({
        path: `/categories/${slugify(name)}`,
        component: resolve(`src/templates/category.tsx`),
        context: cat,
      });
    }

    createPage({
      path: `/categories`,
      component: resolve(`src/templates/categories.tsx`),
      context: { categories: cats },
    });
  } catch (err) {
    throw err;
  }
};
