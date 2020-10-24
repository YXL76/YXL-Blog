import {
  Layout,
  Link,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  useScrollTrigger,
} from "../components";
import { graphql, useStaticQuery } from "gatsby";

export default function App() {
  const {
    allMdx: { group },
  } = useStaticQuery<GatsbyTypes.ArchivesPagesQuery>(graphql`
    query ArchivesPages {
      allMdx(
        filter: { fields: { contentType: { eq: "blogs" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        group(field: frontmatter___archive) {
          fieldValue
          nodes {
            frontmatter {
              date(formatString: "MM/DD")
              title
              subtitle
            }
            slug
          }
        }
      }
    }
  `);

  const trigger = useScrollTrigger();

  return (
    <Layout trigger={trigger}>
      <Timeline align="left">
        {group.map(({ fieldValue, nodes }) => (
          <TimelineItem>
            <TimelineOppositeContent className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
              {fieldValue}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <List>
                {nodes.map(
                  ({ frontmatter: { date, title, subtitle }, slug }) => (
                    <Link
                      to={`/blogs/${slug}`}
                      underline="none"
                      color="inherit"
                    >
                      <ListItem button>
                        <ListItemText primary={title} secondary={subtitle} />
                        <ListItemSecondaryAction>
                          {date}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Link>
                  )
                )}
              </List>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Layout>
  );
}
