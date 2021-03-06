import { Button, Card, navigate } from ".";
import { AssignmentIndOutlined } from "@material-ui/icons";
import type { FC } from "react";
import type { FluidObject } from "gatsby-image";
import Img from "gatsby-image";
import React from "react";
import { useLocateContext } from "../utils";

type CategoryCardProps = {
  img: FluidObject | FluidObject[];
  category: string;
  title: string;
  description: string;
  totalCount: number;
};

export const CategoryCard: FC<CategoryCardProps> = ({
  img,
  category,
  title,
  description,
  totalCount,
}) => {
  const { locate } = useLocateContext();
  return (
    <Card className="overflow-hidden rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300">
      <Img fluid={img} />
      <div className="flex flex-col items-center px-4 pt-4 pb-2 text-center">
        <h2 className="tracking-wider text-3xl">{title}</h2>
        <p className="leading-snug tracking-wider text-base">{description}</p>
        <div className="w-full border-gray-400 pt-2 border-solid border-0 border-t">
          <Button
            startIcon={<AssignmentIndOutlined />}
            color="primary"
            onClick={() => navigate(`/${locate}/categories/${category}`)}
          >
            {totalCount} Blogs
          </Button>
        </div>
      </div>
    </Card>
  );
};
