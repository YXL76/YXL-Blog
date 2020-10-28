import {
  Layout,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  useScrollTrigger,
} from "../components";
import { graphql, navigate, useStaticQuery } from "gatsby";
import type { PageProps } from "gatsby";

export default function App({ location: { href, origin } }: PageProps) {
  const {
    allMdx: { group },
  } = useStaticQuery<GatsbyTypes.ArchivesPageQuery>(graphql`
    query ArchivesPage {
      allMdx(
        filter: { fields: { contentType: { eq: "blogs" } } }
        sort: { order: DESC, fields: frontmatter___date }
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
    <Layout href={href} origin={origin} title="Archives" trigger={trigger}>
      <Paper className="w-full overflow-hidden sm:rounded-3xl">
        <Timeline align="left">
          {group.map(({ fieldValue, nodes }, idx) => (
            <TimelineItem key={idx}>
              <TimelineOppositeContent className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                {fieldValue}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <List>
                  {nodes.map(({ frontmatter, slug }, idx) => {
                    return (
                      <ListItem
                        key={idx}
                        button
                        onClick={() => navigate(`/${slug ?? ""}`)}
                      >
                        <ListItemText
                          primary={frontmatter?.title}
                          secondary={frontmatter?.subtitle}
                        />
                        <ListItemSecondaryAction>
                          {frontmatter?.date}
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </Paper>
    </Layout>
  );
}
