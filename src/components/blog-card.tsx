import { BlogMetadataChip, Button, ButtonBase, Card, Link } from ".";
import { ChevronRight, LocalOfferOutlined } from "@material-ui/icons";
import type { FC } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import { navigate } from "gatsby";

type BlogCardProps = {
  frontmatter: {
    banner?: {
      childImageSharp: {
        fluid: FluidObject | FluidObject[];
      };
    };
    category: string;
    date: string;
    subtitle: string;
    tags: string[];
    title: string;
  };
  excerpt: string;
  slug: string;
  timeToRead: number;
  wordCount: { words: number };
};

export const BlogCard: FC<BlogCardProps> = ({
  frontmatter: { banner, category, date, subtitle, tags, title },
  excerpt,
  slug,
  timeToRead,
  wordCount: { words },
}) => {
  const destination = `/${slug}`;

  return (
    <Card className="flex flex-col items-center mb-10 p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in">
      <div className="w-full relative">
        {banner && (
          <ButtonBase
            focusRipple
            className="w-full overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in"
            onClick={() => navigate(destination)}
            aria-label={`${title}-banner`}
          >
            <Img className="w-full" fluid={banner.childImageSharp.fluid} />
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
        <BlogMetadataChip date={date} words={words} timeToRead={timeToRead} />
      </div>
      <p className="text-lg mt-2 mx-10 text-center">{excerpt}</p>
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
