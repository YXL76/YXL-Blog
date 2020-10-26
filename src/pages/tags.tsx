import { Avatar, Chip, Layout, useScrollTrigger } from "../components";
import { graphql, navigate, useStaticQuery } from "gatsby";
import slugify from "slugify";

export default function App({ location: { href, origin } }) {
  const {
    allMdx: { nodes },
  } = useStaticQuery<GatsbyTypes.TagsPageQuery>(graphql`
    query TagsPage {
      allMdx {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
  `);

  const data: Record<string, number> = {};

  for (const {
    frontmatter: { tags },
  } of nodes) {
    if (tags) {
      for (const tag of tags) {
        if (tag in data) {
          ++data[tag];
        } else {
          data[tag] = 1;
        }
      }
    }
  }

  const trigger = useScrollTrigger();

  return (
    <Layout href={href} origin={origin} title="Tags" trigger={trigger}>
      {Object.entries(data).map(([tag, num], idx) => (
        <Chip
          clickable
          key={idx}
          className="m-2"
          color="primary"
          variant="outlined"
          avatar={<Avatar>{num}</Avatar>}
          label={tag}
          onClick={() => navigate(`/tags/${slugify(tag)}`)}
        />
      ))}
    </Layout>
  );
}
