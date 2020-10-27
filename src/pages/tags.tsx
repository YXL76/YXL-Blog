import { Badge, Layout, useScrollTrigger } from "../components";
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
        <Badge badgeContent={num} color="primary" key={idx}>
          <div
            className="m-2"
            onClick={() => navigate(`/tags/${slugify(tag)}`)}
          >
            {tag}
          </div>
        </Badge>
      ))}
    </Layout>
  );
}
