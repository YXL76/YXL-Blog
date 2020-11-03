import {
  AuthorCard,
  Mdx,
  Paper,
  SEO,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  Typography,
} from "../components";
import React, { useMemo } from "react";
import { SchoolOutlined, WorkOutline } from "@material-ui/icons";
import type { PageProps } from "gatsby";
import { author } from "../../config";
import { message } from "../i18n";
import { useLocateContext } from "../utils";

const { career, education } = author;

const About = ({
  location: { href, pathname },
  pageContext: { title, body },
}: PageProps<null, { title: string; body: string }>) => {
  const { locate } = useLocateContext();
  return (
    <SEO href={href} pathname={pathname} title={title}>
      {useMemo(
        () => (
          <Paper className="group flex flex-col md:flex-row rounded-3xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in">
            <AuthorCard className="max-w-full md:max-w-sm" />
            <Mdx
              className="w-full p-2"
              head={
                <div className="flex flex-wrap justify-center">
                  <div>
                    <h3 className="flex items-center">
                      <SchoolOutlined />
                      {message[locate]["education"]}
                    </h3>
                    <Timeline align="left" classes={{ root: "p-0" }}>
                      {education.map(({ course, institution, date }, idx) => (
                        <TimelineItem key={idx}>
                          <TimelineOppositeContent
                            classes={{ root: "md:pl-0" }}
                          >
                            {date}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent classes={{ root: "pr-0" }}>
                            <Typography>{course}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {institution}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </div>
                  <div>
                    <h3 className="flex items-center">
                      <WorkOutline />
                      {message[locate]["work"]}
                    </h3>
                    <Timeline align="left" classes={{ root: "p-0" }}>
                      {career.map(({ position, company, date }, idx) => (
                        <TimelineItem key={idx}>
                          <TimelineOppositeContent
                            classes={{ root: "md:pl-0" }}
                          >
                            {date}
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent classes={{ root: "pr-0" }}>
                            <Typography>{position}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {company}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                    </Timeline>
                  </div>
                </div>
              }
            >
              {body}
            </Mdx>
          </Paper>
        ),
        [body, locate]
      )}
    </SEO>
  );
};

export default About;
