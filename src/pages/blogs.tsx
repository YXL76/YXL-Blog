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
import SwipeableViews from "react-swipeable-views";
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
  const handleTabsChange = (_event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BlogsLayout
      right={
        <Card className="group mt-10 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in">
          <Tabs value={value} onChange={handleTabsChange} variant="fullWidth">
            <Tab label="Author" />
            <Tab label="TOC" />
          </Tabs>
          <SwipeableViews
            index={value}
            onChangeIndex={(index: number) => setValue(index)}
          >
            <TabPanel value={value} index={0}>
              <AuthorCard
                title={name}
                avatar={publicURL}
                role={role}
                bio={bio}
                social={social}
              ></AuthorCard>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
          </SwipeableViews>
        </Card>
      }
    >
      {nodes.map((node, index) => (
        <BlogCard key={index} author={name} avatar={publicURL} {...node} />
      ))}
    </BlogsLayout>
  );
}
