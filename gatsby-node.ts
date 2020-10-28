import { basename, dirname, resolve } from "path";
import type { FluidObject } from "gatsby-image";
import type { GatsbyNode } from "gatsby";
import simpleGit from "simple-git";
import slugify from "slugify";
const git = simpleGit({ baseDir: __dirname });

export const onCreateNode: GatsbyNode["onCreateNode"] = async ({
  node,
  actions: { createNodeField },
}) => {
  if (node.internal.type === "Mdx") {
    const { fileAbsolutePath } = node;
    createNodeField(
      {
        node,
        name: "contentType",
        value: basename(dirname(fileAbsolutePath as string)),
      },
      { name: "gatsby-plugin-mdx" }
    );
    createNodeField(
      {
        node,
        name: "lastModified",
        value: (await git.log({ file: fileAbsolutePath as string, n: 1 }))
          .latest.date,
      },
      { name: "gatsby-plugin-mdx" }
    );
  }
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  const { data } = await graphql<{
    site: {
      siteMetadata: {
        categories: {
          caption: { children: string; href: string };
          name: string;
          description: string;
          banner: string;
        }[];
      };
    };
    allMdx: {
      edges: {
        next: { id: string };
        node: { frontmatter: { tags?: string[] }; slug: string; id: string };
        previous: { id: string };
      }[];
    };
  }>(
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
          sort: { order: DESC, fields: frontmatter___date }
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

  const myTags: string[] = [];
  data?.allMdx.edges.forEach(
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
          if (!myTags.includes(tag)) {
            myTags.push(tag);
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
  myTags.forEach((tag) => {
    createPage({
      path: `/tags/${slugify(tag)}`,
      component: resolve(`src/templates/tag.tsx`),
      context: { tag },
    });
  });

  const cats = [];

  for (const { name, description, banner, caption } of data?.site.siteMetadata
    .categories ?? []) {
    const { data } = await graphql<{
      file: {
        childImageSharp: { original: { src: string }; fluid: FluidObject };
      };
    }>(
      `
          {
            file(relativePath: { eq: "${banner}" }) {
              childImageSharp {
                original {
                  src
                }
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

    const fluid = data?.file.childImageSharp.fluid;
    const src = data?.file.childImageSharp.original.src;

    const cat = { name, description, caption, fluid, src };
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
};
