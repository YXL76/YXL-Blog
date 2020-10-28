import { Badge, Layout, Link, Paper, useScrollTrigger } from "../components";
import { graphql, useStaticQuery } from "gatsby";
import type { PageProps } from "gatsby";

export default function App({ location: { href, origin } }: PageProps) {
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

  for (const node of nodes) {
    const tags = node?.frontmatter?.tags ?? [];
    for (const tag of tags) {
      tag && (tag in data ? ++data[tag] : (data[tag] = 1));
    }
  }

  const trigger = useScrollTrigger();

  return (
    <Layout href={href} origin={origin} title="Tags" trigger={trigger}>
      <Paper className="pt-6 pb-4 px-4 sm:rounded-3xl">
        {Object.entries(data).map(([tag, num], idx) => (
          <Badge badgeContent={num} color="primary" key={idx}>
            <Link
              className="m-4"
              to={`/tags/${tag}`}
              style={{ fontSize: 16 + num * 2 }}
            >
              {tag}
            </Link>
          </Badge>
        ))}
      </Paper>
    </Layout>
  );
}
