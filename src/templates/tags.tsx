import { Badge, Link, Paper, SEO } from "../components";
import React, { useMemo } from "react";
import type { PageProps } from "gatsby";
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
      {useMemo(
        () => (
          <Paper className="pt-6 pb-4 px-4 rounded-3xl">
            {Object.entries(tags).map(([tag, { name, count }], idx) => (
              <Badge
                className="m-2"
                badgeContent={count}
                color="primary"
                key={idx}
              >
                <Link
                  className="m-1"
                  to={`/${locate}/tags/${tag}`}
                  style={{ fontSize: 16 + count * 2 }}
                >
                  {name}
                </Link>
              </Badge>
            ))}
          </Paper>
        ),
        [locate, tags]
      )}
    </SEO>
  );
};

export default Tags;
