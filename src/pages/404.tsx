import { Layout, useScrollTrigger } from "../components";

export default function App({ location: { href, origin } }) {
  const trigger = useScrollTrigger();
  return (
    <Layout href={href} origin={origin} title="404" trigger={trigger}></Layout>
  );
}
