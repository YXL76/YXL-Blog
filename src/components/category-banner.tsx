import { CategoryOutlined } from "@material-ui/icons";
import type { FC } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import { Link } from ".";
import React from "react";

type CategoryBannerProps = {
  img: FluidObject | FluidObject[];
  category?: string;
  description?: string;
  caption?: Record<string, unknown>;
};

export const CategoryBanner: FC<CategoryBannerProps> = ({
  img,
  category,
  description,
  caption,
}) => (
  <div className="relative overflow-hidden w-full rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
    <Img fluid={img} />
    <div className="absolute inset-0 flex flex-col items-center text-stroke-black hover:bg-black hover:bg-opacity-25 transition-colors duration-300">
      <div className="flex flex-col items-center pt-2 md:pt-4 w-full sm:w-4/5 md:w-3/5 text-center text-white">
        <CategoryOutlined className="bg-blue-400 p-2 sm:p-3 mb-2 rounded-full text-5xl sm:text-6xl" />
        <h2 className="tracking-wider text-stroke-2rem text-3xl sm:text-4xl md:text-5xl">
          {category}
        </h2>
        <p className="leading-snug tracking-wider text-stroke-1rem text-base sm:text-lg md:text-xl">
          {description}
        </p>
      </div>
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
