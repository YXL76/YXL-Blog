import {
  AlarmOutlined,
  AvTimerOutlined,
  ChevronRight,
  EventNoteOutlined,
  LocalOfferOutlined,
} from "@material-ui/icons";
import { Avatar, Button, ButtonBase, Card, Link, MetadataChip } from ".";
import type { FC } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";

type BlogCardProps = {
  frontmatter: {
    banner?: {
      childImageSharp: {
        fluid: FluidObject | FluidObject[];
      };
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
  author: string;
  avatar: string;
};

export const BlogCard: FC<BlogCardProps> = ({
  frontmatter: { banner, category, date, description, subtitle, tags, title },
  slug,
  timeToRead,
  wordCount: { words },
  author,
  avatar,
}) => {
  const destination = `/blogs/${slug}`;
  return (
    <Card className="flex flex-col items-center mb-10 p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in">
      <div className="w-full relative">
        {banner && (
          <ButtonBase
            className="w-full overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in"
            focusRipple
          >
            <Link className="w-full" to={destination}>
              <Img fluid={banner.childImageSharp.fluid} />
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
      <h2 className="font-bold mt-3 text-4xl text-center tracking-wider">
        <Link to={destination}>{title}</Link>
      </h2>
      {subtitle && (
        <h3 className="font-medium mt-2 text-2xl text-center ">{subtitle}</h3>
      )}
      <div className="flex items-center justify-center flex-wrap mt-1">
        <Link to="/about" underline="none">
          <MetadataChip
            clickable
            avatar={<Avatar className="shadow" src={avatar} />}
            label={author}
          />
        </Link>
        <MetadataChip icon={<EventNoteOutlined />} label={date} />
        <MetadataChip icon={<AvTimerOutlined />} label={words} />
        <MetadataChip icon={<AlarmOutlined />} label={`${timeToRead} min`} />
      </div>
      {description && (
        <p className="text-lg mt-2 mx-10 text-center">{description}</p>
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
