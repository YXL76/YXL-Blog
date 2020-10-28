import { Layout, useScrollTrigger } from "../components";
import type { PageProps } from "gatsby";

export default function App({ location: { href, origin } }: PageProps) {
  const trigger = useScrollTrigger();
  return (
    <Layout href={href} origin={origin} title="404" trigger={trigger}>
      <div className="m-auto flex flex-col items-center p-4 text-white">
        <h1 style={{ fontSize: 256 }}>404</h1>
        <h2 className="text-5xl">PAGE NOT FOUND</h2>
      </div>
    </Layout>
  );
}
