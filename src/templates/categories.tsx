import { CategoryOutlined } from "@material-ui/icons";
import {
  Layout,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  useScrollTrigger,
} from "../components";
import { useEffect, useState } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";

export default function App({
  data: { allMdx, mdx },
}: PageProps<GatsbyTypes.CategoriesTemplatesQuery>) {
  const { category } = allMdx?.nodes[0]?.frontmatter ?? {};
  const { banner, description, caption } =
    mdx?.frontmatter?.categories?.find(({ name }) => name === category) ?? {};
  const { fluid } = banner?.childImageSharp ?? {};

  const trigger = useScrollTrigger();

  return (
    <Layout trigger={trigger}>
      {fluid && (
        <div className="relative overflow-hidden w-full sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 max-h-80">
          <Img fluid={fluid} />
          <div className="absolute inset-0 flex flex-col items-center">
            <div className="flex flex-col items-center pt-2 md:pt-4 w-full sm:w-4/5 md:w-3/5 text-center text-white">
              <CategoryOutlined className="bg-blue-400 p-2 sm:p-3 rounded-full text-5xl sm:text-6xl" />
              <h2 className="tracking-wider text-3xl sm:text-4xl md:text-5xl">
                {category}
              </h2>
              <p className="leading-snug tracking-wider text-sm sm:text-base md:text-lg">
                {description}
              </p>
            </div>
          </div>
          {caption && (
            <div className="absolute right-0 bottom-0 px-2">
              <Link
                className="bg-black bg-opacity-50 rounded text-white tracking-wide text-xs sm:text-sm md:text-base"
                underline="none"
                {...caption}
              />
            </div>
          )}
        </div>
      )}
      {allMdx?.nodes && (
        <Paper className="w-full mt-4 overflow-hidden sm:rounded-3xl">
          <List>
            {allMdx.nodes.map(
              ({ frontmatter: { date, title, subtitle }, slug }) => (
                <Link to={`/blogs/${slug}`} underline="none" color="inherit">
                  <ListItem button>
                    <ListItemText primary={title} secondary={subtitle} />
                    <ListItemSecondaryAction>{date}</ListItemSecondaryAction>
                  </ListItem>
                </Link>
              )
            )}
          </List>
        </Paper>
      )}
    </Layout>
  );
}

export const query = graphql`
  query CategoriesTemplates($category: String!) {
    allMdx(
      filter: {
        fields: { contentType: { eq: "blogs" } }
        frontmatter: { category: { eq: $category } }
      }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          date(fromNow: true)
          title
          subtitle
          category
        }
        slug
      }
    }
    mdx(fields: { contentType: { eq: "categories" } }) {
      frontmatter {
        categories {
          banner {
            childImageSharp {
              fluid(maxWidth: 2560) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          caption {
            children
            href
          }
          description
          name
        }
      }
    }
  }
`;
