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
  <ul className="list-none">
    {items.map(({ url, title, items }, idx) => (
      <li key={idx} className="list-none">
        <Link
          href={url}
          color="inherit"
          underline="none"
          className="block pl-2 border-0 border-l-4 border-solid border-transparent text-base leading-7 hover:text-blue-400 hover:border-blue-400 transition-colors duration-300 ease-out"
        >
          {title}
        </Link>
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
        <Card className="group sticky top-6 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in">
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
            <nav className="-ml-8 max-h-screen-3/4 overflow-y-auto">
              {TOC(tableOfContents?.items ?? [])}
            </nav>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AuthorCard
              className="max-h-screen-3/4 overflow-y-auto"
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
      <Mdx className="bg-white mb-10 px-6 py-2 rounded-3xl">
        {mdx?.body ?? ""}
      </Mdx>
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
