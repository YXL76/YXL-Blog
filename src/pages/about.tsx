import { AuthorCard, Layout, Mdx, useScrollTrigger } from "../components";
import { graphql, useStaticQuery } from "gatsby";

export default function App() {
  const {
    mdx: { body },
  } = useStaticQuery<GatsbyTypes.AuthorsPageQuery>(graphql`
    query AuthorsPage {
      mdx(fields: { contentType: { eq: "author" } }) {
        body
      }
    }
  `);

  const trigger = useScrollTrigger();

  return (
    <Layout title="About" trigger={trigger}>
      <div className="group flex bg-white w-full rounded-3xl shadow-md flex-wrap overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in">
        <AuthorCard className="max-w-sm bg-gray-200" />
        <Mdx className="p-6">{body ?? ""}</Mdx>
      </div>
    </Layout>
  );
}
