import {
  AuthorCard,
  BlogCard,
  BlogsLayout,
  Card,
  Tab,
  TabPanel,
  Tabs,
} from "../components";
import { graphql, useStaticQuery } from "gatsby";
import type { ChangeEvent } from "react";
import { useState } from "react";

export default function App() {
  const {
    allMdx: { nodes },
    mdx: {
      frontmatter: {
        name,
        avatar: { publicURL },
        role,
        bio,
        social,
      },
    },
  } = useStaticQuery<GatsbyTypes.BlogsPagesQuery>(graphql`
    query BlogsPages {
      allMdx(
        filter: { fields: { contentType: { eq: "blogs" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        nodes {
          ...BlogFrontmatter
        }
      }
      mdx(fields: { contentType: { eq: "authors" } }) {
        ...AuthorFrontmatter
      }
    }
  `);

  const [value, setValue] = useState(0);

  return (
    <BlogsLayout
      right={
        <Card className="group sticky top-20 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in">
          <Tabs
            value={value}
            onChange={(_event: ChangeEvent<{}>, newValue: number) => {
              setValue(newValue);
            }}
            variant="fullWidth"
          >
            <Tab label="Author" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <AuthorCard
              className="max-h-screen-3/4 overflow-y-auto"
              title={name}
              avatar={publicURL}
              role={role}
              bio={bio}
              social={social}
            />
          </TabPanel>
        </Card>
      }
    >
      {nodes.map((node, index) => (
        <BlogCard key={index} author={name} avatar={publicURL} {...node} />
      ))}
    </BlogsLayout>
  );
}
