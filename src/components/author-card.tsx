import { Avatar, IconButton, Link } from ".";
import {
  Douban,
  Github,
  Instagram,
  Reddit,
  SinaWeibo,
  Telegram,
  Twitter,
} from "mdi-material-ui";
import { EmailOutlined, Facebook } from "@material-ui/icons";
import type { FC } from "react";
import React from "react";
import { author } from "../../config";
import { useLocateContext } from "../utils";

type SocialProps = {
  href: string;
  icon: JSX.Element;
};

const Social: FC<SocialProps> = ({ href, icon }) => (
  <Link href={href}>
    <IconButton aria-label={`social-${href}`}>{icon}</IconButton>
  </Link>
);

type BlogCardProps = {
  className?: string;
};

const {
  name,
  avatar,
  role,
  bio,
  email,
  github,
  twitter,
  facebook,
  instagram,
  reddit,
  douban,
  telegram,
  weibo,
} = author;

export const AuthorCard: FC<BlogCardProps> = ({ className }) => {
  const { locate } = useLocateContext();
  return (
    <div className={`flex flex-col items-center px-4 py-6 ${className || ""}`}>
      <Link to={`/${locate}/about`}>
        <Avatar
          className="h-24 w-24 shadow-md mb-4 group-hover:shadow-lg transition-shadow duration-300 ease-in"
          src={avatar}
          alt="avatar"
        />
      </Link>
      <h2 className="font-medium text-center text-2xl mb-2">
        <Link to={`/${locate}/about`}>{name}</Link>
      </h2>
      <h3 className="font-medium text-center text-lg">{role}</h3>
      <div className="flex flex-wrap justify-center">
        {email && <Social href={`mailto:${email}`} icon={<EmailOutlined />} />}
        {github && (
          <Social href={`https://github.com/${github}`} icon={<Github />} />
        )}
        {twitter && (
          <Social href={`https://twitter.com/${twitter}`} icon={<Twitter />} />
        )}
        {facebook && (
          <Social
            href={`https://www.facebook.com/${facebook}`}
            icon={<Facebook />}
          />
        )}
        {instagram && (
          <Social
            href={`https://www.instagram.com/${instagram}`}
            icon={<Instagram />}
          />
        )}
        {reddit && (
          <Social
            href={`https://www.reddit.com/user/${reddit}`}
            icon={<Reddit />}
          />
        )}
        {douban && (
          <Social
            href={`https://www.douban.com/people/${douban}`}
            icon={<Douban />}
          />
        )}
        {telegram && (
          <Social href={`https://t.me/${telegram}`} icon={<Telegram />} />
        )}
        {weibo && (
          <Social href={`https://weibo.com/u/${weibo}`} icon={<SinaWeibo />} />
        )}
      </div>
      <div className="text-center">{bio}</div>
    </div>
  );
};
