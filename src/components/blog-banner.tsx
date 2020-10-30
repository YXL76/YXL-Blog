import { BlogMetadataChip, Button, Link } from ".";
import type { FC } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import { LocalOfferOutlined } from "@material-ui/icons";
import React from "react";
import { useLocateContext } from "../utils";

type BlogBannerProps = {
  img: FluidObject | FluidObject[];
  category: string;
  title?: string;
  subtitle?: string;
  tags: readonly ({ tag?: string; name?: string } | undefined)[];
  date?: string;
  words?: number;
  timeToRead?: number;
  caption?: Record<string, unknown>;
};

export const BlogBanner: FC<BlogBannerProps> = ({
  img,
  category,
  title,
  subtitle,
  tags,
  date,
  words,
  timeToRead,
  caption,
}) => {
  const { locate } = useLocateContext();
  return (
    <div className="relative overflow-hidden w-full sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <Img fluid={img} />
      <div className="absolute leading-tight text-bg text-shadow left-3 bottom-3 sm:left-6 sm:bottom-6 md:left-12 md:bottom-12">
        <Button
          className="rounded-xl sm:mb-2 md:mb-4"
          variant="contained"
          color="primary"
          size="large"
          to={`/${locate}/categories/${category}`}
        >
          {category}
        </Button>
        <h1 className="tracking-wider text-3xl sm:text-4xl md:text-5xl sm:mb-2 md:mb-4">
          {title}
        </h1>
        <h2 className="tracking-wide text-xl sm:text-2xl md:text-3xl">
          {subtitle}
        </h2>
        <div className="flex flex-wrap mt-2">
          {tags.map(
            (item, idx) =>
              item?.tag && (
                <Button
                  key={idx}
                  className="rounded-2xl mr-2 mt-2"
                  color="primary"
                  startIcon={<LocalOfferOutlined />}
                  size="small"
                  variant="contained"
                  to={`/${locate}/tags/${item.tag}`}
                >
                  {item.name}
                </Button>
              )
          )}
        </div>
      </div>
      <div className="absolute left-3 top-3 sm:left-6 sm:top-6 md:left-12 md:top-12 flex items-center justify-center flex-wrap mt-1">
        <BlogMetadataChip
          className="font-bold text-bg text-shadow sm:text-lg md:text-xl"
          iconClassName="text-bg text-shadow text-xl md:text-2xl"
          date={date}
          words={words}
          timeToRead={timeToRead}
        />
      </div>
      {caption && (
        <div className="absolute right-0 bottom-0 px-2 bg-black bg-opacity-50 rounded">
          <Link
            className="text-white tracking-wide text-xs sm:text-sm md:text-base"
            underline="none"
            {...caption}
          />
        </div>
      )}
    </div>
  );
};
