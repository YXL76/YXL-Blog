import { AssignmentIndOutlined } from "@material-ui/icons";
import { Button } from ".";
import type { FC } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import slugify from "slugify";

type CategoryCardProps = {
  img: FluidObject | FluidObject[];
  title: string;
  description: string;
  totalCount: number;
};

export const CategoryCard: FC<CategoryCardProps> = ({
  img,
  title,
  description,
  totalCount,
}) => (
  <div className="px-4 sm:px-0">
    <div className="overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <Img fluid={img} />
      <div className="flex flex-col items-center px-4 pt-4 pb-2 text-center">
        <h2 className="tracking-wider text-3xl">{title}</h2>
        <p className="leading-snug tracking-wider text-base">{description}</p>
        <div className=" w-full border-gray-400 pt-2 border-solid border-0 border-t">
          <Button
            startIcon={<AssignmentIndOutlined />}
            color="primary"
            to={`/categories/${slugify(title)}`}
          >
            {totalCount} Blogs
          </Button>
        </div>
      </div>
    </div>
  </div>
);
