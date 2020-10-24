import { CategoryOutlined } from "@material-ui/icons";
import type { FC } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import { Link } from ".";

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
  <div className="relative overflow-hidden w-full sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 max-h-80">
    <Img fluid={img} />
    <div className="absolute inset-0 flex flex-col items-center">
      <div className="flex flex-col items-center pt-2 md:pt-4 w-full sm:w-4/5 md:w-3/5 text-center text-white">
        <CategoryOutlined className="bg-blue-400 p-2 sm:p-3 rounded-full text-5xl sm:text-6xl" />
        <h2 className="tracking-wider text-3xl sm:text-4xl md:text-5xl">
          {category}
        </h2>
        <p className="leading-snug tracking-wider text-sm sm:text-base md:text-lg">
          {description}
        </p>
      </div>
    </div>
    {caption && (
      <div className="absolute right-0 bottom-0 px-2">
        <Link
          className="bg-black bg-opacity-50 rounded text-white tracking-wide text-xs sm:text-sm md:text-base"
          underline="none"
          {...caption}
        />
      </div>
    )}
  </div>
);
