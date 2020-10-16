import {
  AlarmOutlined,
  AvTimerOutlined,
  ChevronRight,
  EventNoteOutlined,
  LocalOfferOutlined,
} from "@material-ui/icons";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  Card,
  CardMedia,
  Chip,
  GatsbyLink,
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
    bgcolor="transparent"
    fontSize="1rem"
    fontWeight="fontWeightMedium"
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
    <Card
      borderRadius={24}
      boxShadow={8}
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={8}
      p={4}
    >
      <Box position="relative" width={1}>
        {banner && (
          <ButtonBase
            focusRipple
            borderRadius={24}
            boxShadow={8}
            overflow="hidden"
            width={1}
          >
            <GatsbyLink width={1} to={destination}>
              <CardMedia width={1} pb="50%" image={banner?.publicURL} />
            </GatsbyLink>
          </ButtonBase>
        )}
        <Button
          position="absolute"
          borderRadius={16}
          left={28}
          top={28}
          variant="contained"
          color="primary"
          to={`/categories/${category}`}
        >
          {category}
        </Button>
      </Box>
      <Link
        fontSize={32}
        fontWeight="fontWeightBold"
        letterSpacing={4}
        mt={3}
        textAlign="center"
        to={destination}
      >
        {title}
      </Link>
      {subtitle && (
        <Typography
          fontSize={24}
          fontWeight="fontWeightMedium"
          letterSpacing={1}
          textAlign="center"
        >
          {subtitle}
        </Typography>
      )}
      <Grid container alignItems="center" justify="center" mt={1} spacing={1}>
        <Grid item>
          <MetadataChip
            clickable
            avatar={
              <Avatar
                boxShadow={2}
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
        <Typography fontSize={18} mt={2} mx={10} textAlign="center">
          {description}
        </Typography>
      )}
      <Box
        display="flex"
        alignItems="flex-end"
        flexWrap="nowrap"
        justifyContent="space-between"
        mt={1}
        width={1}
      >
        <Box display="flex" flexWrap="wrap">
          {tags.map((tag) => (
            <Button
              borderRadius={16}
              color="primary"
              startIcon={<LocalOfferOutlined />}
              size="small"
              variant="outlined"
              mr={2}
              mt={2}
            >
              {tag}
            </Button>
          ))}
        </Box>
        <Button
          borderRadius={16}
          variant="contained"
          color="primary"
          endIcon={<ChevronRight />}
          to={destination}
        >
          Continue reading
        </Button>
      </Box>
    </Card>
  );
};
