import {
  AuthorCard,
  BlogCard,
  Card,
  Grid,
  Hidden,
  Layout,
  Tab,
  TabPanel,
  Tabs,
  useScrollTrigger,
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
      mdx(fields: { contentType: { eq: "author" } }) {
        ...AuthorFrontmatter
      }
    }
  `);

  const trigger = useScrollTrigger();
  const [value, setValue] = useState(0);

  return (
    <Layout trigger={trigger}>
      <Grid container>
        <Grid item xs zeroMinWidth>
          {nodes.map((node, idx) => (
            <BlogCard key={idx} author={name} avatar={publicURL} {...node} />
          ))}
        </Grid>
        <Hidden smDown>
          <Grid item xs={4} className="pl-12">
            <Card
              className={`group sticky top-20 overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 transform ease-out ${
                trigger ? "ease-slide-exit -translate-y-14" : ""
              }`}
            >
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
          </Grid>
        </Hidden>
      </Grid>
    </Layout>
  );
}
