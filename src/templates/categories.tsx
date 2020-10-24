import {
  CategoryBanner,
  Layout,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  useScrollTrigger,
} from "../components";
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
        <CategoryBanner
          img={fluid}
          category={category}
          description={description}
          caption={caption}
        />
      )}
      {allMdx?.nodes && (
        <Paper className="w-full mt-4 overflow-hidden sm:rounded-3xl">
          <List>
            {allMdx.nodes.map(
              ({ frontmatter: { date, title, subtitle }, slug }, idx) => (
                <Link
                  key={idx}
                  to={`/blogs/${slug ?? ""}`}
                  underline="none"
                  color="inherit"
                >
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
