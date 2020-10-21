import { Avatar, IconButton, Link, Typography } from ".";
import { Douban, Github, Instagram, Reddit, Twitter } from "mdi-material-ui";
import { EmailOutlined, Facebook } from "@material-ui/icons";
import type { FC } from "react";

const icons: Record<string, JSX.Element> = {
  douban: <Douban />,
  email: <EmailOutlined />,
  facebook: <Facebook />,
  github: <Github />,
  instagram: <Instagram />,
  reddit: <Reddit />,
  twitter: <Twitter />,
};

type BlogCardProps = {
  className?: string;
  title: string;
  avatar: string;
  role: string;
  social: ReadonlyArray<
    GatsbyTypes.Maybe<Pick<GatsbyTypes.MdxFrontmatterSocial, "link" | "type">>
  >;
  bio: string;
};

export const AuthorCard: FC<BlogCardProps> = ({
  className,
  title,
  avatar,
  role,
  social,
  bio,
}) => {
  return (
    <div className={`flex flex-col items-center px-4 py-6 ${className ?? ""}`}>
      <Link to="/about">
        <Avatar
          className="h-24 w-24 shadow-md mb-4 group-hover:shadow-lg transition-shadow duration-300 ease-in"
          src={avatar}
        />
      </Link>
      <Typography
        variant="h2"
        className="font-medium text-center text-2xl tracking-wide mb-2"
      >
        <Link to="/about">{title}</Link>
      </Typography>
      <Typography variant="h3" className="font-medium text-center text-lg">
        {role}
      </Typography>
      <div className="flex flex-wrap justify-center">
        {social.map(
          (i, idx) =>
            i &&
            i["type"] &&
            icons[i["type"]] && (
              <Link key={idx} href={i["link"] ?? ""}>
                <IconButton key={idx}>{icons[i["type"]]}</IconButton>
              </Link>
            )
        )}
      </div>
      <Typography className="text-center text-md">{bio}</Typography>
    </div>
  );
};
