import { Badge, Layout, useScrollTrigger } from "../components";
import { graphql, navigate, useStaticQuery } from "gatsby";
import type { PageProps } from "gatsby";
import slugify from "slugify";

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
