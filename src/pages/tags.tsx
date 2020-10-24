import { Avatar, Chip, Layout, Link, useScrollTrigger } from "../components";
import { graphql, useStaticQuery } from "gatsby";
import slugify from "slugify";

export default function App() {
  const {
    allMdx: { nodes },
  } = useStaticQuery<GatsbyTypes.TagsPagesQuery>(graphql`
    query TagsPages {
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
    <Layout trigger={trigger}>
      {Object.entries(data).map(([tag, num], idx) => (
        <Link
          key={idx}
          to={`/tags/${slugify(tag)}`}
          underline="none"
          color="inherit"
        >
          <Chip
            clickable
            className="m-2"
            color="primary"
            variant="outlined"
            avatar={<Avatar>{num}</Avatar>}
            label={tag}
          />
        </Link>
      ))}
    </Layout>
  );
}
