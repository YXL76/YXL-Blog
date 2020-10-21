import {
  AuthorCard,
  BlogsLayout,
  Card,
  Link,
  Mdx,
  Tab,
  TabPanel,
  Tabs,
} from "../components";
import type { ChangeEvent } from "react";
import type { PageProps } from "gatsby";
import { graphql } from "gatsby";
import { useState } from "react";

type TocItem = {
  url: string;
  title: string;
  items?: TocItem[];
};

const TOC = (items: TocItem[]) => (
  <ul>
    {items.map(({ url, title, items }, idx) => (
      <li key={idx}>
        <Link href={url}>{title}</Link>
        {items && TOC(items)}
      </li>
    ))}
  </ul>
);

export default function App({
  data: { mdx, author },
}: PageProps<GatsbyTypes.BlogsTemplatesQuery>) {
  const [value, setValue] = useState(0);

  const tableOfContents: TocItem = mdx?.tableOfContents ?? ({} as TocItem);

  return (
    <BlogsLayout
      right={
        <Card className="group mt-10 sticky top-6 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in">
          <Tabs
            value={value}
            onChange={(_event: ChangeEvent<{}>, newValue: number) => {
              setValue(newValue);
            }}
            variant="fullWidth"
          >
            <Tab label="Contents" />
            <Tab label="Author" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <nav>{TOC(tableOfContents?.items ?? [])}</nav>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AuthorCard
              title={author?.frontmatter?.name ?? ""}
              avatar={author?.frontmatter?.avatar?.publicURL ?? ""}
              role={author?.frontmatter?.role ?? ""}
              bio={author?.frontmatter?.bio ?? ""}
              social={author?.frontmatter?.social ?? []}
            />
          </TabPanel>
        </Card>
      }
    >
      <div className="bg-white my-10 px-6 py-2 rounded-3xl">
        <Mdx>{mdx?.body ?? ""}</Mdx>
      </div>
    </BlogsLayout>
  );
}

export const query = graphql`
  query BlogsTemplates($id: String!) {
    mdx(id: { eq: $id }) {
      body
      tableOfContents(maxDepth: 3)
    }
    author: mdx(fields: { contentType: { eq: "authors" } }) {
      ...AuthorFrontmatter
    }
  }
`;
