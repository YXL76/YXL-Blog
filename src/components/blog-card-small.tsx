import { BlogMetadataChip, Card, Link } from ".";
import type { FC } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import React from "react";

type BlogCardSmallProps = {
  img: FluidObject | FluidObject[];
  title?: string;
  subtitle?: string;
  description: string;
  date?: string;
  words?: number;
  timeToRead?: number;
  slug?: string;
};

export const BlogCardSmall: FC<BlogCardSmallProps> = ({
  img,
  title,
  subtitle,
  description,
  date,
  words,
  timeToRead,
  slug,
}) => (
  <Card className="overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
    <Img fluid={img} />
    <div className="flex flex-col items-center px-2 pt-2 pb-2 text-center">
      <h2 className="tracking-wider text-2xl">
        <Link to={slug}>{title}</Link>
      </h2>
      <h3 className="tracking-wider text-xl">{subtitle}</h3>
      <div className="leading-snug tracking-wider text-base mt-1 mb-2">
        {description}
      </div>
      <div className="w-full border-gray-400 pt-2 border-solid border-0 border-t">
        <BlogMetadataChip date={date} words={words} timeToRead={timeToRead} />
      </div>
    </div>
  </Card>
);
