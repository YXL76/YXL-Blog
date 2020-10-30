import { Badge, Link, Paper, SEO } from "../components";
import type { PageProps } from "gatsby";
import React from "react";
import { useLocateContext } from "../utils";

export default function App({
  location: { href, pathname },
  pageContext: { tags },
}: PageProps<null, { tags: Record<string, number> }>) {
  const { locate } = useLocateContext();

  return (
    <SEO href={href} pathname={pathname} title="Tags">
      <Paper className="pt-6 pb-4 px-4 sm:rounded-3xl">
        {Object.entries(tags).map(([tag, num], idx) => (
          <Badge badgeContent={num} color="primary" key={idx}>
            <Link
              className="m-4"
              to={`/${locate}/tags/${tag}`}
              style={{ fontSize: 16 + num * 2 }}
            >
              {tag}
            </Link>
          </Badge>
        ))}
      </Paper>
    </SEO>
  );
}
