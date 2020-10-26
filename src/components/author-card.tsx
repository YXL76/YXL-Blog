import { Avatar, IconButton, Link } from ".";
import { graphql, useStaticQuery } from "gatsby";
import { EmailOutlined } from "@material-ui/icons";
import type { FC } from "react";
import { Github } from "mdi-material-ui";

type SocialButtonProps = {
  href: string;
  icon: JSX.Element;
};

const SocialButton: FC<SocialButtonProps> = ({ href, icon }) => (
  <Link href={href}>
    <IconButton>{icon}</IconButton>
  </Link>
);

type BlogCardProps = {
  className?: string;
};

export const AuthorCard: FC<BlogCardProps> = ({ className }) => {
  const { site } = useStaticQuery<GatsbyTypes.AuthorCardComponentQuery>(graphql`
    query AuthorCardComponent {
      site {
        siteMetadata {
          author {
            name
            avatar
            role
            bio
            email
            github
          }
        }
      }
    }
  `);

  const { name, avatar, role, bio, email, github } =
    site?.siteMetadata?.author ?? {};

  return (
    <div className={`flex flex-col items-center px-4 py-6 ${className ?? ""}`}>
      <Link to="/about">
        <Avatar
          className="h-24 w-24 shadow-md mb-4 group-hover:shadow-lg transition-shadow duration-300 ease-in"
          src={avatar}
        />
      </Link>
      <h2 className="font-medium text-center text-2xl mb-2">
        <Link to="/about">{name}</Link>
      </h2>
      <h3 className="font-medium text-center text-lg">{role}</h3>
      <div className="flex flex-wrap justify-center">
        {email && <SocialButton href="" icon={<EmailOutlined />} />}
        {github && <SocialButton href={github} icon={<Github />} />}
      </div>
      <div className="text-center">{bio}</div>
    </div>
  );
};
