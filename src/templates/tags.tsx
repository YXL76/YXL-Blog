import { Badge, Layout, Link, Paper, useScrollTrigger } from "../components";
import type { PageProps } from "gatsby";
import React from "react";
import { useLocateContext } from "../utils";

export default function App({
  location,
  pageContext: { tags },
}: PageProps<null, { tags: Record<string, number> }>) {
  const { locate } = useLocateContext();
  const trigger = useScrollTrigger();

  return (
    <Layout {...location} title="Tags" trigger={trigger}>
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
    </Layout>
  );
}
