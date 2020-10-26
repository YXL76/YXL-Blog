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

export default function App({ location: { href, origin } }) {
  const {
    allMdx: { nodes },
  } = useStaticQuery<GatsbyTypes.BlogsPageQuery>(graphql`
    query BlogsPage {
      allMdx(
        filter: { fields: { contentType: { eq: "blogs" } } }
        sort: { order: DESC, fields: frontmatter___date }
      ) {
        nodes {
          frontmatter {
            banner {
              childImageSharp {
                fluid(maxWidth: 2560) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          ...BlogFrontmatter
          excerpt
        }
      }
    }
  `);

  const trigger = useScrollTrigger();
  const [value, setValue] = useState(0);

  return (
    <Layout href={href} origin={origin} title="Blogs" trigger={trigger}>
      <Grid container>
        <Grid item xs zeroMinWidth>
          {nodes.map((node, idx) => (
            <BlogCard key={idx} {...node} />
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
                <AuthorCard className="max-h-screen-3/4 overflow-y-auto" />
              </TabPanel>
            </Card>
          </Grid>
        </Hidden>
      </Grid>
    </Layout>
  );
}
