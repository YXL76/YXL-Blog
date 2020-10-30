import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  SEO,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  navigate,
} from "../components";
import type { PageProps } from "gatsby";
import React from "react";

export default function App({
  location: { href, pathname },
  pageContext: { group },
}: PageProps<null, GatsbyTypes.MdxConnection>) {
  return (
    <SEO href={href} pathname={pathname} title="Archives">
      <Paper className="overflow-hidden sm:rounded-3xl">
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
                  {nodes.map(({ fields, frontmatter }, idx) => {
                    return (
                      <ListItem
                        key={idx}
                        button
                        onClick={() => navigate(fields?.slug || "")}
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
    </SEO>
  );
}
