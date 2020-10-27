import { Layout, useScrollTrigger } from "../components";
import type { PageProps } from "gatsby";

export default function App({ location: { href, origin } }: PageProps) {
  const trigger = useScrollTrigger();
  return (
    <Layout
      href={href}
      origin={origin}
      title="Index"
      trigger={trigger}
    ></Layout>
  );
}
