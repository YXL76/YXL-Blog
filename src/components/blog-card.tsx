import { BlogMetadataChip, Button, ButtonBase, Card, navigate } from ".";
import { ChevronRight, LocalOfferOutlined } from "@material-ui/icons";
import type { FC } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import type { ISharpGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import { useLocateContext } from "../utils";

type BlogCardProps = {
  image: ISharpGatsbyImageData;
  category: string;
  date?: string;
  subtitle?: string;
  tags: readonly ({ tag?: string; name?: string } | undefined)[];
  title?: string;
  excerpt?: string;
  slug?: string;
  timeToRead?: number;
  words?: number;
};

export const BlogCard: FC<BlogCardProps> = ({
  image,
  category,
  date,
  subtitle,
  tags,
  title,
  excerpt,
  slug,
  timeToRead,
  words,
}) => {
  const { locate } = useLocateContext();
  return (
    <Card className="flex flex-col items-center mb-10 p-2 sm:p-4 md:p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 ease-in">
      <div className="w-full relative">
        <ButtonBase
          focusRipple
          className="w-full overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in"
          onClick={() => navigate(slug || "")}
          aria-label="banner"
        >
          <GatsbyImage className="w-full" image={image} alt="banner" />
        </ButtonBase>
        <Button
          className="absolute rounded-xl left-3 top-3 sm:left-6 sm:top-6"
          variant="contained"
          color="primary"
          onClick={() => navigate(`/${locate}/categories/${category}`)}
        >
          {category}
        </Button>
      </div>
      <h2
        className="cursor-pointer text-primary font-bold mt-3 text-2xl sm:text-3xl md:text-4xl text-center tracking-wider"
        onClick={() => navigate(slug as string)}
      >
        {title}
      </h2>
      {subtitle && (
        <h3 className="font-medium mt-2 text-lg sm:text-xl md:text-2xl text-center">
          {subtitle}
        </h3>
      )}
      <div className="flex items-center justify-center flex-wrap mt-1">
        <BlogMetadataChip date={date} words={words} timeToRead={timeToRead} />
      </div>
      <div className="text-base sm:text-lg mt-2 sm:mx-6 text-center break-words">
        {excerpt}
      </div>
      <div className="flex items-end flex-nowrap justify-between w-full mt-1">
        <div className="flex flex-wrap">
          {tags.map(
            (item, idx) =>
              item && (
                <Button
                  key={idx}
                  className="rounded-2xl mr-2 mt-2"
                  color="primary"
                  startIcon={<LocalOfferOutlined />}
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    navigate(`/${locate}/tags/${item.tag as string}`)
                  }
                >
                  {item.name}
                </Button>
              )
          )}
        </div>
        <Button
          className="rounded-2xl"
          variant="contained"
          color="primary"
          size="small"
          endIcon={<ChevronRight />}
          onClick={() => navigate(slug as string)}
        >
          Continue reading
        </Button>
      </div>
    </Card>
  );
};
