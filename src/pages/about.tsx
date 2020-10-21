import { AuthorCard, Layout, Mdx } from "../components";
import { graphql, useStaticQuery } from "gatsby";

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
        ...AuthorFrontmatter
        body
      }
    }
  `);

  return (
    <Layout>
      <div className="group flex bg-white w-full rounded-3xl shadow-md flex-wrap overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in">
        <AuthorCard
          className="max-w-sm bg-gray-200"
          title={name}
          avatar={publicURL}
          role={role}
          bio={bio}
          social={social}
        />
        <div className="p-6">
          <Mdx>{body ?? ""}</Mdx>
        </div>
      </div>
    </Layout>
  );
}
