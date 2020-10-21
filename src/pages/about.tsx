import { Avatar, IconButton, Layout, Mdx, Typography } from "../components";
import { Douban, Github, Instagram, Reddit, Twitter } from "mdi-material-ui";
import { EmailOutlined, Facebook } from "@material-ui/icons";
import { graphql, useStaticQuery } from "gatsby";

const icons: Record<string, JSX.Element> = {
  douban: <Douban />,
  email: <EmailOutlined />,
  facebook: <Facebook />,
  github: <Github />,
  instagram: <Instagram />,
  reddit: <Reddit />,
  twitter: <Twitter />,
};

export default function App() {
  const {
    mdx: {
      frontmatter: {
        name,
        avatar: { publicURL },
        role,
        bio,
        social,
      },
      body,
    },
  } = useStaticQuery<GatsbyTypes.AuthorsPagesQuery>(graphql`
    query AuthorsPages {
      mdx(fields: { contentType: { eq: "authors" } }) {
        frontmatter {
          name
          avatar {
            publicURL
          }
          role
          bio
          interests
          education {
            course
            date
            institution
          }
          social {
            link
            type
          }
        }
        body
      }
    }
  `);

  return (
    <Layout>
      <div className="flex bg-white w-full rounded-3xl shadow-md flex-wrap overflow-hidden hover:shadow-lg">
        <div className="flex flex-col items-center max-w-xs p-6 bg-gray-200">
          <Avatar src={publicURL} className="w-32 h-32 mb-4" />
          <Typography
            variant="h2"
            className="font-medium text-center text-3xl tracking-wide mb-2"
          >
            {name}
          </Typography>
          <Typography
            variant="h3"
            className="font-medium text-center text-xl mb-2"
          >
            {role}
          </Typography>
          <Typography className="text-center text-lg">{bio}</Typography>
          <div className="flex flex-wrap justify-center">
            {social.map(
              ({ type, link }, idx) =>
                type in icons && (
                  <IconButton key={idx} href={link}>
                    {icons[type]}
                  </IconButton>
                )
            )}
          </div>
        </div>
        <div className="p-6">
          <Mdx>{body ?? ""}</Mdx>
        </div>
      </div>
    </Layout>
  );
}
