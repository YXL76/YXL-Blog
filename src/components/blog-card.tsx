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
import classes from "../styles/blog-card.module.scss";

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
}) => <Chip clickable={clickable} avatar={avatar} icon={icon} label={label} />;

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
    <Card>
      <div className={classes["category-container"]}>
        {banner && (
          <ButtonBase focusRipple>
            <Link to={destination}>
              <CardMedia image={banner?.publicURL} />
            </Link>
          </ButtonBase>
        )}
        <Button
          variant="contained"
          color="primary"
          to={`/categories/${category}`}
        >
          {category}
        </Button>
      </div>
      <Link to={destination}>{title}</Link>
      {subtitle && <Typography>{subtitle}</Typography>}
      <Grid container alignItems="center" justify="center" spacing={1}>
        <Grid item>
          <MetadataChip
            clickable
            avatar={
              <Avatar src="https://estudiopatagon.com/themes/wordpress/breek/wp-content/uploads/2019/06/avatar-op2.jpg" />
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
      {description && <Typography>{description}</Typography>}
      <div
        className={`flex flex-align-items-end flex-nowrap flex-justify-content-space-between ${classes.footer}`}
      >
        <div className="flex flex-wrap">
          {tags.map((tag, idx) => (
            <Button
              key={idx}
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
