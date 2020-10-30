import { Badge, Link, Paper, SEO } from "../components";
import type { PageProps } from "gatsby";
import React from "react";
import { useLocateContext } from "../utils";

const Tags = ({
  location: { href, pathname },
  pageContext: { title, tags },
}: PageProps<
  null,
  { title: string; tags: Record<string, { name: string; count: number }> }
>) => {
  const { locate } = useLocateContext();

  return (
    <SEO href={href} pathname={pathname} title={title}>
      <Paper className="pt-6 pb-4 px-4 sm:rounded-3xl">
        {Object.entries(tags).map(([tag, { name, count }], idx) => (
          <Badge badgeContent={count} color="primary" key={idx}>
            <Link
              className="m-4"
              to={`/${locate}/tags/${tag}`}
              style={{ fontSize: 16 + count * 2 }}
            >
              {name}
            </Link>
          </Badge>
        ))}
      </Paper>
    </SEO>
  );
};

export default Tags;
