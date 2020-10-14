import {
  AlarmOutlined,
  AvTimerOutlined,
  EventNoteOutlined,
} from "@material-ui/icons";
import {
  Avatar,
  Button,
  Card,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from "../components";
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

export const BlogCard: FC = () => {
  return (
    <Card
      borderRadius={24}
      boxShadow={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      my={8}
      p={4}
    >
      <CardMedia
        borderRadius={24}
        boxShadow={4}
        pb="50%"
        width={1}
        image="https://estudiopatagon.com/themes/wordpress/breek/wp-content/uploads/2019/06/480016-PGKTGR-852-op.jpg"
      >
        <Button
          borderRadius={16}
          left={20}
          top={24}
          variant="contained"
          color="primary"
        >
          Categories
        </Button>
      </CardMedia>
      <Typography
        fontSize={32}
        fontWeight="fontWeightBold"
        letterSpacing={4}
        mt={4}
        textAlign="center"
      >
        Hello World! Hello World! Hello World! Hello World!
      </Typography>
      <Grid
        container
        xs
        alignItems="center"
        justify="center"
        mt={2}
        spacing={2}
      >
        <Grid item>
          <MetadataChip
            clickable
            avatar={
              <Avatar
                boxShadow={4}
                src="https://estudiopatagon.com/themes/wordpress/breek/wp-content/uploads/2019/06/avatar-op2.jpg"
              />
            }
            label="Author"
          />
        </Grid>
        <Grid item>
          <MetadataChip icon={<EventNoteOutlined />} label="2020-01-01" />
        </Grid>
        <Grid item>
          <MetadataChip icon={<AvTimerOutlined />} label="2020" />
        </Grid>
        <Grid item>
          <MetadataChip icon={<AlarmOutlined />} label="10 min" />
        </Grid>
      </Grid>
      <Typography fontSize={20} mt={2} mx={10} textAlign="center">
        Hello World! Hello World! Hello World! Hello World! Hello World! Hello
        World! Hello World! Hello World!
      </Typography>
      <Button borderRadius={16} variant="contained" color="primary" mt={2}>
        Continue reading
      </Button>
    </Card>
  );
};
