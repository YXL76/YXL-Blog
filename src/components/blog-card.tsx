import {
  AlarmOutlined,
  AvTimerOutlined,
  ChevronRight,
  EventNoteOutlined,
  LocalOfferOutlined,
} from "@material-ui/icons";
import {
  Avatar,
  Button,
  ButtonBase,
  Card,
  CardMedia,
  Chip,
  Grid,
  Link,
  Typography,
} from ".";
import type { FC, ReactElement, ReactNode } from "react";
import React from "react";

type MetadataChipProps = {
  avatar?: ReactElement;
  clickable?: boolean;
  label?: ReactNode;
  icon?: ReactElement;
};

const MetadataChip: FC<MetadataChipProps> = ({
  avatar,
  clickable,
  label,
  icon,
}) => (
  <Chip
    className="bg-transparent font-medium text-base"
    clickable={clickable}
    avatar={avatar}
    icon={icon}
    label={label}
  />
);

type BlogCardProps = {
  frontmatter: {
    banner?: {
      publicURL: string;
    };
    category: string;
    date: string;
    description: string;
    subtitle: string;
    tags: string[];
    title: string;
  };
  slug: string;
  timeToRead: number;
  wordCount: { words: number };
};

export const BlogCard: FC<BlogCardProps> = ({
  frontmatter: { banner, category, date, description, subtitle, tags, title },
  slug,
  timeToRead,
  wordCount: { words },
}) => {
  const destination = `/blogs/${slug}`;
  return (
    <Card className="flex flex-col items-center my-10 p-6 rounded-3xl shadow-md hover:shadow-lg">
      <div className="w-full relative">
        {banner && (
          <ButtonBase
            className="w-full overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in"
            focusRipple
          >
            <Link className="w-full" to={destination}>
              <CardMedia className="w-full pb-half" image={banner?.publicURL} />
            </Link>
          </ButtonBase>
        )}
        <Button
          className="absolute rounded-xl left-6 top-6"
          variant="contained"
          color="primary"
          to={`/categories/${category}`}
        >
          {category}
        </Button>
      </div>
      <Link
        className="font-bold mt-3 text-4xl text-center tracking-widest"
        to={destination}
      >
        {title}
      </Link>
      {subtitle && (
        <Typography className="font-medium text-2xl text-center tracking-wide">
          {subtitle}
        </Typography>
      )}
      <Grid
        container
        className="mt-1"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Grid item>
          <MetadataChip
            clickable
            avatar={
              <Avatar
                className="shadow-lg"
                src="https://estudiopatagon.com/themes/wordpress/breek/wp-content/uploads/2019/06/avatar-op2.jpg"
              />
            }
            label="Author"
          />
        </Grid>
        <Grid item>
          <MetadataChip icon={<EventNoteOutlined />} label={date} />
        </Grid>
        <Grid item>
          <MetadataChip icon={<AvTimerOutlined />} label={words} />
        </Grid>
        <Grid item>
          <MetadataChip icon={<AlarmOutlined />} label={`${timeToRead} min`} />
        </Grid>
      </Grid>
      {description && (
        <Typography className="text-lg mt-2 mx-10 text-center">
          {description}
        </Typography>
      )}
      <div className="flex items-end flex-no-wrap justify-between w-full mt-1">
        <div className="flex flex-wrap">
          {tags.map((tag, idx) => (
            <Button
              key={idx}
              className="rounded-2xl mr-2 mt-2"
              color="primary"
              startIcon={<LocalOfferOutlined />}
              size="small"
              variant="outlined"
            >
              {tag}
            </Button>
          ))}
        </div>
        <Button
          className="rounded-2xl"
          variant="contained"
          color="primary"
          endIcon={<ChevronRight />}
          to={destination}
        >
          Continue reading
        </Button>
      </div>
    </Card>
  );
};