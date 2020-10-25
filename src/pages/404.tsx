import { Layout, useScrollTrigger } from "../components";

export default function App() {
  const trigger = useScrollTrigger();
  return <Layout title="404" trigger={trigger}></Layout>;
}
