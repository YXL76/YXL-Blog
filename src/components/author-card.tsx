import { Avatar, Card, Link, Typography } from ".";
import type { FC } from "react";
import React from "react";

type BlogCardProps = {
  frontmatter: {
    name: string;
    avatar: { publicURL: string };
    signature: string;
  };
  slug: string;
};

export const AuthorCard: FC<BlogCardProps> = ({
  frontmatter: {
    name,
    avatar: { publicURL },
    signature,
  },
  slug,
}) => {
  const destination = `/authors/${slug}`;
  return (
    <div className="group flex flex-col items-center lg:w-1/3 md:w-1/2 w-full p-4">
      <Link to={destination}>
        <Avatar
          className="z-10 h-20 w-20 shadow-md top-16px group-hover:shadow-lg"
          src={publicURL}
        ></Avatar>
      </Link>
      <Card className="relative flex flex-col items-center p-6 w-full rounded-3xl shadow-md group-hover:shadow-lg">
        <Typography variant="h2" className="font-medium text-3xl">
          <Link to={destination}>{name}</Link>
        </Typography>
        <Typography className="text-xl">{signature}</Typography>
      </Card>
    </div>
  );
};
